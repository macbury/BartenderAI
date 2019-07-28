module Types
  class ProportionArgumentsType < BaseInputObject
    description "Attributes for creating or updating recipe proportion"

    argument :position, Integer, 'This attribute tell in what order each ingredient will be poured', required: true
    argument :bottle_id, ID, 'ID of the bottle with ingredient', required: true
    argument :id, ID, required: false
    argument :amount, Integer, 'Number of milliliters to pour', required: true
  end
end
