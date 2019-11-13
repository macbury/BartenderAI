module Mutations
  class MakeADrink < GraphQL::Schema::RelayClassicMutation
    null true

    argument :name, String, required: true, description: "Name or id of the drink"

    field :order, Types::OrderType, null: true
    field :errors, [String], null: false

    def resolve(name:)
      ::MakeADrink.call(name) do |m|
        m.success do |order|
          return {
            order: order,
            errors: []
          }
        end

        m.failure do |errors|
          return {
            order: nil,
            errors: errors
          }
        end
      end  
    end
  end
end
