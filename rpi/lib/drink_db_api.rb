require 'httparty'

class DrinksDBApi
  include HTTParty
  attr_reader :endpoint, :token

  def initialize(endpoint:, token:)
    @endpoint = endpoint
    @token = token
  end

  # Prevent heroku instance from entering sleep
  def ping
    self.class.get("#{endpoint}/api/ping", body: {
      token: token
    })
  end

  def update_order_status(order_id:, status:)
    execute(%{
      mutation($id: ID!, $status: String!) {
        updateOrder(input: { id: $id, status: $status }) {
          order {
            id
            status
          }

          errors
        }
      }
    }, { id: order_id, status: status })
  end

  def say(message)
    execute(%{
      mutation($message: String) {
        say(input: { message: $message, translationKey: true }) {
          success
        }
      }
    }, { message: message })
  end

  def pending_orders
    execute(%{
      {
        pendingOrders: orders(status: Pending) {
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
    }).dig('data', 'pendingOrders')
  end

  private

  def execute(query, variables = {})
    resp = self.class.post("#{endpoint}/api", body: {
      token: token,
      query: query,
      variables: variables
    })

    JSON.parse(resp.body)
  end
end
