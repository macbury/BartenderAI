module Mutations
  class UpdateBottle < GraphQL::Schema::RelayClassicMutation
    null true

    argument :id, ID, required: true
    argument :color, String, required: false
    argument :size, Integer, required: false
    argument :flow_rate, Integer, required: false
    argument :content, String, required: false
    argument :startup_delay, Float, required: false

    field :bottle, Types::BottleType, null: true
    field :errors, [String], null: false

    def resolve(*args)
      arguments = args[0]
      bottle_id = arguments.delete(:id)
      bottle = Bottle.where(id: bottle_id).first

      if bottle&.update_attributes(arguments)
        {
          bottle: bottle,
          errors: [],
        }
      elsif bottle
        {
          bottle: nil,
          errors: bottle.errors.full_messages
        }
      else
        {
          bottle: nil,
          errors: ['Could not find bottle']
        }
      end
    end
  end
end
