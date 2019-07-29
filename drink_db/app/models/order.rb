class Order < ApplicationRecord
  belongs_to :recipe
  enum status: [:pending, :preparing, :done, :rejected, :waiting_for_payment, :waiting_for_invoice]

  scope :by_uid, ->(order_id) { where(id: order_id).or(where(payment_request: order_id)) }
  scope :in_queue, -> { pending.or(preparing) }
  scope :payment_stuff, -> { waiting_for_invoice.or(waiting_for_payment) }
  scope :processed, -> { in_queue.or(payment_stuff) }
  scope :timeout, -> { where('updated_at <= ?', 5.minutes.ago) }

  monetize :price_cents, as: :price

  after_save :push_to_webhooks
  after_save :push_to_client
  after_create :consume_liquid

  def self.reject_old!
    in_queue.or(payment_stuff).timeout.update_all(status: :rejected)
  end

  def push_to_client
    DrinkDBSchema.subscriptions.trigger('onUpdateOrder', {}, self)
  end

  def consume_liquid
    recipe.proportions.with_content.each do |proportion|
      proportion.bottle.decrement!(:liquid_left, proportion.amount)
    end
  end

  def push_to_webhooks
    IFTTWebhook.new.trigger_all(drink_name: self.recipe.name) if status == :done
  end
end
