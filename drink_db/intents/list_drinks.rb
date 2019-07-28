intent "ListDrinks" do
  ask("I know how to prepare: #{Recipe.pluck(:name).to_sentence}")
end
