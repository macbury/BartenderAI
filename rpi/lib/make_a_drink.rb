class MakeADrink
  include Dry::Transaction
  COMPLETE_DRINK_TIMEOUT = 8

  tee :change_status_to_preparing
  step :ensure_presence_of_glass
  step :pour
  tee :notify_user_about_completion
  tee :change_status_to_done

  attr_reader :api, :logger, :glass, :relay

  def initialize(api:, logger:, glass:, relay:)
    super
    @api = api
    @glass = glass
    @logger = logger
    @relay = relay
  end

  def ensure_presence_of_glass(order:)
    api.say('alexa.assembler.put_glass') unless glass.present?
    if glass.wait_for_it
      Led.put_glass!
      api.say('alexa.assembler.start_pouring')
      Success(order: order)
    else
      Led.error!
      api.say('alexa.assembler.glass_not_present')
      api.update_order_status(order_id: order['id'], status: :rejected)
      Failure(errors: ['Glass is not present'])
    end
  end

  def change_status_to_preparing(order:)
    api.update_order_status(order_id: order['id'], status: :preparing)
  end

  def pour(order:)
    Led.preparing!(0)
    pour_steps = order.dig('recipe', 'proportions').map do |proportion|
      content = proportion.dig('bottle', 'content')
      relay_id = proportion.dig('bottle', 'location')
      time_left = proportion['pourTime']
      logger.info "Switching on relay: #{relay_id}"
      relay.turn_on(relay_id)
      { content: content, relay_id: relay_id, time_left: time_left }
    end

    total_time = pour_steps.map { |s| s[:time_left] }.max
    current_time = 0
    while pour_steps.size > 0
      logger.info "Still pouring: #{pour_steps.map { |s| s[:content] }.join(', ')}"
      pour_steps.reject! do |step|
        if step[:time_left] <= 0
          relay.turn_off(step[:relay_id])
          logger.info "Finished pouring: #{step[:content]}"
          true
        else
          step[:time_left] -= 1
          false
        end
      end
      current_time += 1
      sleep 1
      Led.preparing!((current_time / total_time * 100).round)
    end
    relay.turn_all_off
    Success(order: order)
  end

  def notify_user_about_completion(order:)
    logger.info "Waiting for #{COMPLETE_DRINK_TIMEOUT} seconds..."
    sleep COMPLETE_DRINK_TIMEOUT
    if glass.present?
      api.say('alexa.assembler.drink_done_take_glass')
      Led.take_glass!
    end
    logger.info "Waiting for removing glass"
    glass.wait_for_removal
    logger.info "Completed preparing: #{order}"
    api.say('alexa.assembler.thankyou')
    Led.success!
  end

  def change_status_to_done(order:)
    api.update_order_status(order_id: order['id'], status: :done)
  end
end
