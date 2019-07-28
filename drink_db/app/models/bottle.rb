class Bottle < ApplicationRecord
  validates :location, uniqueness: true
  validates :content, presence: true
  validates :color, presence: true, format: { with: /#[a-f0-9]{3,6}/i }
  validates :startup_delay, numericality: { greater_than_or_equal_to: 0.0 }

  has_many :proportions, dependent: :destroy
  has_many :recipes, through: :proportions

  before_create :refill

  scope :by_content_or_id, ->(content_or_id) { where('content ILIKE :content OR id = :id', content: "#{content_or_id}%", id: content_or_id.to_i)}
  scope :with_proportions, -> { joins(:proportions).where('proportions.amount > 0') }

  def refill
    self.liquid_left = size
  end
end
