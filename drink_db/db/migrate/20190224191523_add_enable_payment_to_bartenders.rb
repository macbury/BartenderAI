class AddEnablePaymentToBartenders < ActiveRecord::Migration[5.2]
  def change
    add_column :bartenders, :enable_payment, :boolean, default: false
  end
end
