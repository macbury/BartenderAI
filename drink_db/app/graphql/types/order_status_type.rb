module Types
  class OrderStatusType < BaseEnum
    value 'All', description: 'All orders', value: :all
    value 'Processed', value: :processed
    value 'Pending', value: :pending
    value 'Preparing', value: :preparing
    value 'Done', value: :done
    value 'Rejected', value: :rejected
    value 'WaitingForPayment', value: :waiting_for_payment
  end
end
