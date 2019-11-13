class AlexaController < ApplicationController
  skip_before_action :verify_authenticity_token

  def handle
    AlexaSkill.call(request) do |t|
      t.success do |response|
        render inline: response
      end

      t.failure do |errors|
        Rails.logger.error "Could not fullfill request: #{errors.join(', ')}"
        render inline: errors
      end
    end
  end
end
