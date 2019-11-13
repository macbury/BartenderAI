module Mutations
  class UpdateOrder < GraphQL::Schema::RelayClassicMutation
    null true

    argument :id, ID, required: true
    argument :status, String, required: false

    field :order, Types::OrderType, null: true
    field :errors, [String], null: false

    def resolve(*args)
      arguments = args[0]
      order_id = arguments.delete(:id)
      order = Order.by_uid(order_id).first
      
      if order&.update_attributes(arguments)
        {
          order: order,
          errors: [],
        }
      elsif order
        {
          order: nil,
          errors: order.errors.full_messages
        }
      else
        {
          order: nil,
          errors: ['Could not find order']
        }
      end
    end
  end
end
