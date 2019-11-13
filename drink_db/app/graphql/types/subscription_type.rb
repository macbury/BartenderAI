class Types::SubscriptionType < Types::BaseObject
  field :on_update_order, Types::OrderType, null: false, description: 'Triggered if order was updated'
  field :on_bartender_update, Types::BartenderType, null: false, description: 'Triggered every time bartender updates'

  def on_update_order
    object
  end

  def on_bartender_update
    object
  end
end