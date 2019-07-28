class CreateProportions < ActiveRecord::Migration[5.2]
  def change
    create_table :proportions do |t|
      t.integer :position
      t.integer :parts
      t.references :recipe
      t.references :bottle

      t.timestamps
    end
  end
end
