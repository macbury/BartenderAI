require 'httparty'
class IFTTWebhook
  include HTTParty
  base_uri 'maker.ifttt.com'

  def trigger(event_name:, drink_name: nil)
    self.class.post(
      "/trigger/#{event_name}/with/key/#{ENV.fetch('IFTTT_KEY')}", 
      {
        body: { value1: drink_name }.to_json,
        headers: { 'Content-Type' => 'application/json' }
      }
    )
  end
end