module Mutations
  class CreateRecipe < GraphQL::Schema::RelayClassicMutation
    null true

    argument :name, String, required: false
    argument :price, Float, required: false
    argument :proportions, [Types::ProportionArgumentsType], required: true

    field :recipe, Types::RecipeType, null: true
    field :errors, [String], null: false

    def resolve(name:, proportions:, price:)
      recipe = Recipe.new(
        name: name,
        price: price,
        proportions_attributes: proportions.map(&:to_h)
      )

      if recipe.save
        {
          recipe: recipe,
          errors: [],
        }
      else
        {
          recipe: nil,
          errors: recipe.errors.full_messages
        }
      end
    end
  end
end
