module Mutations
  class UpdateRecipe < GraphQL::Schema::RelayClassicMutation
    null true

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :price, Float, required: false
    argument :proportions, [Types::ProportionArgumentsType], required: true

    field :recipe, Types::RecipeType, null: true
    field :errors, [String], null: false

    def resolve(name:, proportions:, price:, id:)
      recipe = Recipe.where(id: id).first

      if recipe.nil?
        {
          recipe: nil,
          errors: ['Could not find recipe']
        }
      elsif recipe.update_attributes(name: name, price: price, proportions_attributes: proportions.map(&:to_h))
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
