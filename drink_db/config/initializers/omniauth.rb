OmniAuth.config.full_host = ENV.fetch('DRINKDB_HOST')

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV.fetch('GOOGLE_CLIENT_ID'), ENV.fetch('GOOGLE_CLIENT_SECRET'), {
    prompt: 'select_account',
    hd: ENV.fetch('COMPANY_DOMAIN')
  }
end
