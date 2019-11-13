module Mutations
  class RefillBottle < GraphQL::Schema::RelayClassicMutation
    null true

    argument :content, String, required: true, description: "Content or id of the bottle"

    field :bottle, Types::BottleType, null: true
    field :errors, [String], null: false

    def resolve(content:)
      ::RefillBottle.call(content) do |m|
        m.success do |bottle|
          return {
            bottle: bottle,
            errors: []
          }
        end

        m.failure do |errors|
          return {
            bottle: nil,
            errors: errors
          }
        end
      end  
    end
  end
end
