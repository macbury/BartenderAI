intent 'AboutDrink' do
  drink_name = request.slot_value('DrinkName')
  recipe = Recipe.by_name_or_id(drink_name).first

  if recipe
    ask("Drink #{recipe.name} is prepared with #{recipe.ingredients.to_sentence}. What you want me to do now?")
  else
    ask("Hmm... I dont know drink with name #{drink_name}")
  end
end
