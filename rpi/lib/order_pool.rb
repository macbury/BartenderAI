require 'action_cable_client'

class OrderPool
  ON_ORDER_UPDATE_QUERY = %{
    subscription {
      onUpdateOrder {
        id
        status
        recipe {
          proportions {
            bottle {
              content
              location
            }
            pourTime
          }
        }
      }
    }
  }

  attr_reader :uri, :logger, :api

  def initialize(api:, endpoint:, token:, logger: Logger.new(STDOUT))
    @uri = "#{endpoint}?token=#{token}&bartender"
    @logger = logger
    @api = api
  end

  def start
    logger.info 'Connecting...'
    client.connected do
      logger.info 'Connected...'
    end

    client.subscribed do
      logger.info 'Subscribed! Setting up graphql subscription'

      client.perform('execute', {
        query: ON_ORDER_UPDATE_QUERY
      })
    end

    client.errored do |msg|
      logger.error "Error with: #{msg}"
    end

    client.disconnected do
      logger.error 'Disconnected! Reconnecting in 1 second'
      reconnect
    end

    client.received do |msg|
      data = msg.dig('message', 'result', 'data', 'onUpdateOrder')
      if data && data['status'] == 'pending'
        @on_pending_order&.call(data)
      elsif data && data['status'] == 'rejected'
        @on_reject_order&.call(data)
      end
    end
  end

  def on_pending_order(&block)
    @on_pending_order = block
  end

  def on_reject_order(&block)
    @on_reject_order = block
  end

  private

  def client
    @client ||= ActionCableClient.new(uri, {
      channel: 'GraphqlChannel',
    }, true, {
      Origin: 'https://bartender.app'
    })
  end

  def reconnect
    EventMachine.add_timer(5) do
      client.reconnect!
    end
  end
end
