class CreateBartenders < ActiveRecord::Migration[5.2]
  def change
    create_table :bartenders do |t|
      t.integer :status, default: 0
      t.string :ip

      t.timestamps
    end
  end
end
