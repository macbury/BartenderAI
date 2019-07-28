module Types
  class PriceType < Types::BaseObject
    field :value, Float, null: false, description: 'Non fractional value'
    field :cents, Integer, null: false, description: 'Fractional value in cents'
    field :currency, String, null: false, description: 'Name of currency'
    field :formatted, String, null: false, description: 'Pretty formatted price'

    def value
      object.amount
    end

    def currency
      object.currency_as_string
    end

    def cents
      object.fractional
    end

    def formatted
      object.to_s
    end
  end
end
