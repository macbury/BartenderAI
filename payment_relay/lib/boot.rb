$:.unshift(File.dirname(__FILE__))
ENV['GRPC_SSL_CIPHER_SUITES'] = "HIGH+ECDSA"

require 'pry'
require 'grpc'
require 'logger'
require 'eventmachine'
require 'rpc_services_pb'
require_relative 'invoices'
require_relative 'api'
require_relative 'payment_pool'
require_relative 'pinger'

logger = Logger.new(STDOUT)

invoices = Invoices.new(
  certificate_path: ENV.fetch('LND_CERT_PATH'),
  macaroon_path: ENV.fetch('LND_MACAROON_PATH'),
  node_address: ENV.fetch('LND_NODE_ADDRESS')
)

api = Api.new(
  endpoint: ENV.fetch('BARTENDER_HTTP_ENDPOINT'),
  token: ENV.fetch('BARTENDER_TOKEN')
)

pool = PaymentPool.new(
  logger: logger,
  endpoint: ENV.fetch('BARTENDER_WS_ENDPOINT'),
  token: ENV.fetch('BARTENDER_TOKEN')
)

pinger = Pinger.new(
  api: api,
  logger: logger
)

EventMachine.run do
  logger.info 'Starting up...'
  pool.start
  pinger.start

  invoices.on_settled_invoice do |invoice|
    response = api.update_order_to_be_pending(invoice.payment_request)
    logger.info "User payed for: #{invoice.payment_request} and got: #{response.inspect}"
  end

  pool.on_begin_payment do |order|
    invoice = invoices.create(
      title: order.dig('recipe', 'name'),
      amount: order.dig('price', 'cents')
    )

    response = api.update_order_to_wait_for_payment(
      order_id: order['id'],
      payment_request: invoice[:payment_request]
    )
    logger.info "Sended #{invoice.inspect} and got: #{response.inspect}"
  end
end
