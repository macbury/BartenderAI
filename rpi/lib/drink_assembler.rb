require_relative 'make_a_drink'

class DrinkAssembler
  attr_reader :queue, :logger, :api, :glass, :relay

  def initialize(logger:, api:, glass:, relay:)
    @queue = []
    @logger = logger
    @api = api
    @glass = glass
    @relay = relay
  end

  def remove(order_to_remove)
    logger.info "Removing order: #{order_to_remove['id']}"
    @queue = @queue.delete_if { |order| order_to_remove['id'] == order['id'] }
  end

  def consume(order)
    logger.info 'Received new order!'
    @queue << order
  end

  def start
    @queue += api.pending_orders
    check
  end

  def check
    #logger.info 'Waiting for recipe'
    EventMachine.add_timer(5) { process }
  end

  private

  def process
    check and return if queue.empty?
    order = queue.shift
    logger.info "Preparing order: ##{order['id']}"

    operation = -> {
      MakeADrink.new(
        api: api,
        logger: logger,
        glass: glass,
        relay: relay
      ).call(order: order)
    }

    callback = -> (_) { check }

    errback = -> (error) {
      logger.error error
      check
    }
    EventMachine.defer(operation, callback, errback)
  end
end
