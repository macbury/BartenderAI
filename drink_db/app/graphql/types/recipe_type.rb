module Types
  class RecipeType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :bottles, [BottleType], null: false
    field :ingredients, [String], null: false
    field :price, PriceType, null: true
    field :total_volume, Integer, null: false, description: 'How many mililiters'
    field :preparation_time, Integer, null: false, description: 'How many seconds are required to prepare drink'
    field :proportions, [ProportionType], null: false do
      argument :with_content, Boolean, required: false, default_value: true, description: 'Return only required proportions'
    end

    field :served, Integer, null: false, description: 'How many orders have been served for this recipe' do
      argument :from, Arguments::TimeArgument, required: true
    end

    def proportions(with_content: true)
      if with_content
        object.proportions.with_content.by_position
      else
        object.proportions.by_position
      end
    end

    def served(from:)
      object.orders.done.where('created_at >= ?', from).count
    end
  end
end
