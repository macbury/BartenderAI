module Types
  class BottleType < Types::BaseObject
    field :id, ID, null: false
    field :location, Integer, null: false, description: 'Id of bottle on physical device'
    field :content, String, null: false, description: 'Content of the bottle'
    field :color, String, null: false, description: 'Color of the liquid in hex'
    field :flow_rate, Integer, null: false, description: 'Milliliters per second'
    field :liquid_left, Integer, null: false, description: 'Milliliters left in the bottle'
    field :size, Integer, null: false, description: 'Size in ml. of the bottle'
    field :startup_delay, Float, null: false
  end
end
