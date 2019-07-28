require 'httparty'

class Api
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

  def update_order_to_wait_for_payment(order_id:, payment_request:)
    execute(%{
      mutation($id: ID!, $status: String!, $payment_request: String) {
        updateOrder(input: { id: $id, status: $status, paymentRequest: $payment_request }) {
          order {
            id
            status
            paymentRequest
          }

          errors
        }
      }
    }, { id: order_id, status: :waiting_for_payment, payment_request: payment_request })
  end

  def update_order_to_be_pending(order_id)
    execute(%{
      mutation($id: ID!, $status: String!) {
        updateOrder(input: { id: $id, status: $status}) {
          order {
            id
            status
          }

          errors
        }
      }
    }, { id: order_id, status: :pending })
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
