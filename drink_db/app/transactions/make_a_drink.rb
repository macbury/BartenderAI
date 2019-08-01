class MakeADrink < BaseTransaction
  step :find_recipe
  step :calculate_required_liquid
  step :check_for_free_bartender
  try :create_order, catch: ActiveRecord::RecordInvalid

  def find_recipe(name_or_id)
    recipe = Recipe.by_name_or_id(name_or_id).first
    if recipe
      Success(recipe)
    else
      Failure(["I don't know how to prepare a drink with name #{name_or_id}"])
    end
  end

  def calculate_required_liquid(recipe)
    recipe.proportions.each do |proportion|
      if proportion.bottle.liquid_left - proportion.amount < 0
        return Failure(["Out of #{proportion.bottle.content}!"])
      end
    end

    return Success(recipe)
  end

  def check_for_free_bartender(recipe)
    if Bartender.offline.exists?
      Failure(["Bartender is offline"])
    else
      Success(recipe)
    end
  end

  def create_order(recipe)
    if Bartender.current.enable_payment?
      recipe.orders.create!(
        status: :waiting_for_payment,
        price: recipe.price.exchange_to('BTC'),
        bitcoin_key: Bitcoin::Key.generate.to_base58
      )
    else
      recipe.orders.create!(status: :pending)
    end
  end
end
