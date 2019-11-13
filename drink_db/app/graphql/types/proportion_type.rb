module Types
  class ProportionType < Types::BaseObject
    field :id, ID, null: false
    field :amount, Integer, null: false, description: 'Number of mililiters to pour'
    field :bottle, BottleType, null: false
    field :position, Integer, null: false, description: 'Tells in what order each proportion should be applied'
    field :pour_time, Integer, null: false, description: 'How many seconds are required to pour content of bottle'
  end
end
