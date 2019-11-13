class ChangePartsToProportions < ActiveRecord::Migration[5.2]
  def change
    remove_column :proportions, :parts
    add_column :proportions, :amount, :integer, default: 0
  end
end
