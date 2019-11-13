module Types
  class CurrentUserType < Types::BaseObject
  	field :id, ID, null: false
  	field :name, String, null: false
    field :access_token, String, null: false
  end
end
