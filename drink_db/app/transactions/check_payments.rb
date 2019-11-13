class CheckPayments < BaseTransaction
  tee :reject_old_orders
  step :get_pending_orders
  step :check_pending_orders

  def reject_old_orders(_)
    Order.reject_old!
  end

  def get_pending_orders 
    orders = Order.waiting_for_payment.all
    return Failure("No pending orders") if orders.empty?
    Success(orders)
  end

  def check_pending_orders(orders)
    orders.each do |order|
      balance = btc.address_balance(order.bitcoin.addr)
      Rails.logger.info "Balance for address: #{order.bitcoin.addr} is #{balance} but should be #{order.price.cents}"
      order.pending! if balance >= order.price.cents
    end
    Success(orders)
  end

  private

  def btc
    @btc ||= BTCPayment.new
  end
end
