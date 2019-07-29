require 'logger'
require 'eventmachine'
require 'pry'
require 'dry-transaction'
require_relative 'order_pool'
require_relative 'drink_assembler'
require_relative 'drink_db_api'
require_relative 'glass_detector'
require_relative 'relay'
require_relative 'rpi'
require_relative 'pinger'

logger = Logger.new(STDOUT)
glass = GlassDetector.new(trigger_pin: 16, echo_pin: 18, distance_to_glass: 5)
relay = Relay.new

api = DrinksDBApi.new(
  endpoint: ENV.fetch('BARTENDER_HTTP_ENDPOINT'),
  token: ENV.fetch('BARTENDER_TOKEN')
)

pool = OrderPool.new(
  endpoint: "#{ENV.fetch('BARTENDER_WS_ENDPOINT')}/api/rt",
  token: ENV.fetch('BARTENDER_TOKEN'),
  api: api
)

assembler = DrinkAssembler.new(
  logger: logger,
  api: api,
  glass: glass,
  relay: relay
)

pinger = Pinger.new(api: api, logger: logger)

begin
  EventMachine.run do
    logger.info 'Starting up...'

    pool.on_pending_order do |order|
      assembler.consume(order)
    end

    pool.on_reject_order do |order|
      assembler.remove(order)
    end

    assembler.start
    pinger.start
    pool.start
  end
ensure
  relay.reset
  glass.reset
end