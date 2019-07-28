module Types
  class OrderType < Types::BaseObject
    field :id, ID, null: false
    field :recipe, RecipeType, null: false
    field :created_at, String, null: false
    field :status, String, null: false, description: ''
    field :price, PriceType, null: true
    field :payment_request, String, null: true, description: 'Bitcoin lighting invoice payment request.'
  end
end
