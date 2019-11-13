module Types
  class QueryType < Types::BaseObject
    field :current_user, CurrentUserType, description: 'Return current user', null: false
    field :current_bartender, BartenderType, description: 'Bartender machine info', null: false
    field :bottles, [BottleType], description: 'List all bottles', null: false
    field :recipes, [RecipeType], description: 'List all recipes', null: false
    field :recipe, RecipeType, description: 'Fetch recipe by its id', null: true do
      argument :id, ID, required: true
    end

    field :orders, [OrderType], description: 'List all pending orders', null: true do
      argument :status, OrderStatusType, default_value: :all, required: false
    end

    def bottles
      Bottle.order('location ASC').all
    end

    def recipes
      Recipe.order('name ASC').all
    end

    def current_user
      context[:current_user]
    end

    def orders(status:)
      Order.send(status).order('created_at ASC').all
    end

    def current_bartender
      Bartender.current
    end

    def recipe(id:)
      Recipe.where(id: id).first
    end
  end
end
