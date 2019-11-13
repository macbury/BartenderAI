ingredients = {
  'Vodka' => '#ffffff',
  'Coconut Liqueur' => '#ece9e4',
  'Blue Curraco' => '#3277a8',
  'Orange Juice' => '#eec03a',
  'Gin' => '#97d7f1',
  'Grenadine' => '#9b1f21',
  'Sprite' => '#17aa4f',
  'Pineapple Juice' => '#f4d078'
}

ingredients.each_with_index do |(content, color), bottle_id|
  bottle = Bottle.find_or_initialize_by(location: bottle_id + 1)
  next unless bottle.new_record?

  bottle.content = content
  bottle.color = color
  bottle.save!
end

Bartender.current
