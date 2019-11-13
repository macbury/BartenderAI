class AddStartupDelayToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :startup_delay, :float, default: 0.0
  end
end
