module Mutations
  class DeleteRecipe < GraphQL::Schema::RelayClassicMutation
    null true

    argument :id, ID, required: true

    field :recipe, Types::RecipeType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      recipe = Recipe.where(id: id).first

      if recipe.nil?
        {
          recipe: nil,
          errors: ['Could not find recipe']
        }
      else
        recipe.destroy
        {
          recipe: recipe,
          errors: []
        }
      end
    end
  end
end
