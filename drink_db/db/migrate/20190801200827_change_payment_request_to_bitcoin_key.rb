class ChangePaymentRequestToBitcoinKey < ActiveRecord::Migration[5.2]
  def change
    remove_column :orders, :payment_request, :string
    add_column :orders, :bitcoin_key, :string
  end
end
