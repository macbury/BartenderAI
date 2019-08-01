class PingController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def update
    CheckPayments.call
    BTCExchange.refresh!
    render json: { ok: true }
  end
end
