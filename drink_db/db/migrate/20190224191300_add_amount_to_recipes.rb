class AddAmountToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :amount, :integer, default: 10000
  end
end
