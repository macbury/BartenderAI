class CreateSession < BaseTransaction
  step :validate_email
  step :encrypt_uid
  step :find_or_create_user

  def validate_email(omniauth)
    email = omniauth.info.email
    first_name = omniauth.info.first_name
    if email && email.match(/#{ENV.fetch('COMPANY_DOMAIN')}$/i)
      Success(email: email, first_name: first_name)
    else
      Failure(['Invalid email'])
    end
  end

  def encrypt_uid(email:, first_name:)
    uuid = Digest::SHA512.hexdigest([ENV.fetch('SECRET_KEY_BASE'), email].join('-'))
    Success(uuid: uuid, name: first_name)
  end

  def find_or_create_user(uuid:, name:)
    user = User.find_or_initialize_by(google_uid: uuid)
    user.name = name
    if user.save
      Success(user)
    else
      Failure(user.errors.full_messages)
    end
  end
end
