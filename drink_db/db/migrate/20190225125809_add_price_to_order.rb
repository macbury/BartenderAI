class AddPriceToOrder < ActiveRecord::Migration[5.2]
  def change
    remove_column :orders, :amount
    add_monetize :orders, :price
    change_column :orders, :price_currency, :string,  default: 'BTC'
  end
end
