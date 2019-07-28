class AddStartupDelayToBottles < ActiveRecord::Migration[5.2]
  def change
    add_column :bottles, :startup_delay, :float, default: 0.0
  end
end
