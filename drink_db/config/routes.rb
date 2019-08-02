Rails.application.routes.draw do
  mount ActionCable.server => '/api/rt'
  post '/api/alexa', to: 'alexa#handle'
  get '/api/ping', to: 'ping#update'
  match '/api', to: 'graphql#execute', as: :api, via: [:get, :post]

  get 'auth', to: 'sessions#new'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  get '*path' => 'home#index'
  root 'home#index'
end
