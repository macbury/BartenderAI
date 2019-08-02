class SessionsController < ApplicationController
  def new
    session[:redirect_to] = params[:redirect_to] || '/'
    redirect_to '/auth/google_oauth2'
  end

  def create
    CreateSession.call(omniauth) do |transaction|
      transaction.success do |user|
        cookies.signed[:user_id] = user.id
        flash[:success] = 'You have logged in!'
        Rails.logger.info 'User authenticated!'
      end

      transaction.failure do |errors|
        Rails.logger.error "Could not authenticate user: #{errors.joins(', ')}"
        flash[:error] = errors.join(', ')
      end
    end

    redirect_to session[:redirect_to]
  end

  def destroy
    flash[:success] = 'You have logged out!'
    cookies.signed[:user_id] = nil
    redirect_to root_path
  end

  private

  def omniauth
    request.env['omniauth.auth']
  end
end
