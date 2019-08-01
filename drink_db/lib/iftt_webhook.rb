require 'httparty'
class IFTTWebhook
  include HTTParty
  base_uri 'maker.ifttt.com'

  def trigger_all(drink_name:)
    ENV.fetch('IFTTT_EVENTS').split(',').each do |event_name|
      trigger(event_name: event_name, drink_name: drink_name)
    end
  end

  def trigger(event_name:, drink_name:)
    self.class.post(
      "/trigger/#{event_name}/with/key/#{ENV.fetch('IFTTT_KEY')}", 
      {
        body: { value1: drink_name }.to_json,
        headers: { 'Content-Type' => 'application/json' }
      }
    )
  end
end