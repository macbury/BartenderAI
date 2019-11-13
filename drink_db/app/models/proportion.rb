class Proportion < ApplicationRecord
  belongs_to :recipe, required: false
  belongs_to :bottle

  validates :amount, presence: true, numericality: { greater_than_or_equal_to: 0 }

  scope :by_position, -> { order('position') }
  scope :with_content, -> { where('amount > 0') }

  def pour_time
    bottle.startup_delay + (amount.to_f / bottle.flow_rate.to_f).round
  end
end
