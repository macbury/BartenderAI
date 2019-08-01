require 'httparty'
class BTCPayment
  include HTTParty
  base_uri 'blockstream.info'
  def address_balance(key)
    response = self.class.get(
      "/testnet/api/address/#{key}"
    )
    [
      0,
      response.dig('chain_stats', 'funded_txo_sum'),
      response.dig('mempool_stats', 'funded_txo_sum'),
    ].compact.max
  end
end