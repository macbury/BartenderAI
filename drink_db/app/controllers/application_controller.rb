class ApplicationController < ActionController::Base
  before_action :autologin_user!

  def autologin_user!
    cookies.signed[:user_id] = api_user.id if api_user
  end

  def authenticate_user!
    autologin_user!
    render json: { data: { errors: 'Unauthorized' } }, status: :unauthorized unless user_signed_in?
  end

  def user_signed_in?
    current_user.present?
  end

  def current_user
    @current_user ||= (api_user || session_user)
  end

  def session_user
    User.where(id: cookies.signed[:user_id]).first if cookies.signed[:user_id]
  end

  def api_user
    User.where(access_token: params[:token]).first if params.key?(:token)
  end
end
