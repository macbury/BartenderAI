class PingController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def update
    ActiveRecord::Base.transaction do
      Order.reject_old!
      BTCExchange.refresh!
    end
    render json: { ok: true }
  end
end
