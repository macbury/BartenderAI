# Ping heroku instance to perform cron like logick and prevent it from going to sleep...
class Pinger
  attr_reader :api, :logger

  def initialize(api:, logger:)
    @api = api
    @logger = logger
  end

  def start
    ping
  end

  private

  def ping
    operation = -> { api.ping }
    callback = -> (_) do
      EventMachine.add_timer(10) { ping }
    end

    EventMachine.defer(operation, callback)
  end
end
