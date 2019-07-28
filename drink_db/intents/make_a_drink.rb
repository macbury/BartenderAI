intent 'MakeDrink' do
  drink_name = request.slot_value('DrinkName')

  response = MakeADrink.call(drink_name)

  if response.success?
    order = response.success
    recipe = order.recipe
    message = I18n.t(
      order.waiting_for_invoice? ? 'alexa.success.waiting_for_invoice' : 'alexa.success.make_a_drink', 
      name: recipe.name
    ).sample

    tell(message, end_session: true)
  else
    message = I18n.t('alexa.failures.make_a_drink', error: response.failure.join(', ')).sample
    ask(message)
  end
end
