class Types::SubscriptionType < Types::BaseObject
  field :on_update_order, Types::OrderType, null: false, description: 'Triggered if order was updated'

  def on_update_order
    object
  end
end