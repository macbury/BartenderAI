class AddLiquidLeftToBottles < ActiveRecord::Migration[5.2]
  def change
    add_column :bottles, :liquid_left, :integer, default: 0

    Bottle.all.each do |bottle|
      bottle.refill
      bottle.save
    end
  end
end
