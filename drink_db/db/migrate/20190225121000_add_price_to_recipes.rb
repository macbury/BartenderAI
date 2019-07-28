class AddPriceToRecipes < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :amount
    add_monetize :recipes, :price
  end
end
