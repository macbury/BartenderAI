class AddSizeToBottles < ActiveRecord::Migration[5.2]
  def change
    add_column :bottles, :size, :integer, default: 900
  end
end
