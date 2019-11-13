module Types
  class BartenderType < Types::BaseObject
    field :id, ID, null: false
    field :status, String, null: false
    field :ip, String, null: true
    field :updated_at, String, null: false
    field :enable_payment, Boolean, null: false
  end
end
