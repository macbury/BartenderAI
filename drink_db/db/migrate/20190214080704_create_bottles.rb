class CreateBottles < ActiveRecord::Migration[5.2]
  def change
    create_table :bottles do |t|
      t.integer :location
      t.string :content
      t.string :color

      t.timestamps
    end
  end
end
