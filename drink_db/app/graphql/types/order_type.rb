module Types
  class OrderType < Types::BaseObject
    field :id, ID, null: false
    field :recipe, RecipeType, null: false
    field :created_at, String, null: false
    field :status, String, null: false, description: ''
    field :price, PriceType, null: true
    field :payment_address, String, null: true, description: 'Bitcoin lighting invoice payment request.'

    def payment_address
      object&.bitcoin&.addr
    end
  end
end
