require 'action_cable_client'

class PaymentPool
  ON_ORDER_UPDATE_QUERY = %{
    subscription {
      onUpdateOrder {
        id
        status
        price {
          cents
        }
        recipe {
          name
        }
      }
    }
  }
  attr_reader :uri, :logger

  def initialize(endpoint:, token:, logger: Logger.new(STDOUT))
    @uri = "#{endpoint}/api/rt?token=#{token}"
    @logger = logger
  end

  def start
    client.connected do
      logger.info 'Connecting...'
    end

    client.subscribed do
      logger.info 'Subscribed! Setting up graphql subscription'

      client.perform('execute', {
        query: ON_ORDER_UPDATE_QUERY
      })
    end

    client.disconnected do
      logger.error 'Disconnected! Reconnecting in 1 second'
      reconnect
    end
  end

  def on_begin_payment(&block)
    client.received do |msg|
      data = msg.dig('message', 'result', 'data', 'onUpdateOrder')
      block.call(data) if data && data['status'] == 'waiting_for_invoice'
    end
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
