module Types
  class MutationType < Types::BaseObject
    field :create_recipe, mutation: Mutations::CreateRecipe, description: 'Create new recipe'
    field :update_recipe, mutation: Mutations::UpdateRecipe, description: 'Update existing recipe'
    field :delete_recipe, mutation: Mutations::DeleteRecipe, description: 'Remove recipe from the system'
    field :make_a_mother_fucking_drink, mutation: Mutations::MakeADrink, description: 'Order bartender to make a drink as Samuel L. Jackson'
    field :make_a_drink, mutation: Mutations::MakeADrink, description: 'Ask bartender to make a drink'
    field :update_order, mutation: Mutations::UpdateOrder, description: 'Update order'
    field :update_bottle, mutation: Mutations::UpdateBottle, description: 'Update bottle attributes'
    field :update_bartender, mutation: Mutations::UpdateBartender, description: 'Update bartender attributes'
    field :refill_bottle, mutation: Mutations::RefillBottle, description: 'Refill bottle content'
    field :say, mutation: Mutations::Say, description: 'Announce message from alexa speaker'
  end
end
