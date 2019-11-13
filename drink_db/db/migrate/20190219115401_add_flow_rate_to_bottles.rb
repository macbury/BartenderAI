class AddFlowRateToBottles < ActiveRecord::Migration[5.2]
  def change
    add_column :bottles, :flow_rate, :integer, default: (1000/60).floor
  end
end
