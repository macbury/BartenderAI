require 'open-uri'
class BTCExchange
  def self.refresh!
    exchanges.each do |currency, options|
      rate = options['15m']
      Money.add_rate('BTC', currency, rate)
      Money.add_rate(currency, 'BTC', 1/rate)
    end
  end

  def self.exchanges
    Rails.cache.fetch('exchanges', expires_in: 15.minutes) do
      JSON.parse(open('https://blockchain.info/ticker').read)
    end
  end
end
