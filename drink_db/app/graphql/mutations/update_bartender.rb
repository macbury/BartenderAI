module Mutations
  class UpdateBartender < GraphQL::Schema::RelayClassicMutation
    null true

    argument :enable_payment, Boolean, required: false

    field :bartender, Types::BartenderType, null: true
    field :errors, [String], null: false

    def resolve(*args)
      bartender = Bartender.current
      arguments = args[0]
      if bartender&.update_attributes(arguments)
        {
          bartender: bartender,
          errors: [],
        }
      else
        {
          bartender: null,
          errors: bartender.full_errors
        }
      end
    end
  end
end
