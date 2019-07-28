module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_by_token || find_by_cookie
      close and return unless self.current_user

      if bartender?
        Bartender.current.update_attributes(ip: request.remote_ip)
        Bartender.current.idle!
      end

      logger.add_tags 'ActionCable', "User: #{current_user.id}"
    end

    def disconnect
      Bartender.current.offline! if bartender?
    end

    def find_by_token
      User.where(access_token: request.params[:token]).first
    end

    def find_by_cookie
      User.where(id: cookies.signed[:user_id]).first
    end

    def bartender?
      request.params.key?(:bartender)
    end
  end
end
