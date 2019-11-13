class Recipe < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :proportions, -> { order('proportions.position ASC') }, dependent: :destroy
  has_many :bottles, through: :proportions
  has_many :orders, dependent: :destroy

  monetize :price_cents, as: :price

  scope :by_name_or_id, ->(name_or_id) { where('name ILIKE :name OR id = :id', name: "#{name_or_id}%", id: name_or_id.to_i)}

  accepts_nested_attributes_for :proportions

  def total_volume
    proportions.sum(:amount)
  end

  def ingredients
    bottles.with_proportions.map(&:content).uniq
  end

  def preparation_time
    proportions.with_content.map(&:pour_time).sum
  end
end
