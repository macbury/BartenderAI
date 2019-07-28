class AddAmountToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :amount, :integer, default: 0
    add_column :orders, :payment_request, :string
  end
end
