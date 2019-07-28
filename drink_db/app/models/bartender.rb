class Bartender < ApplicationRecord
  enum status: [:offline, :idle, :preparing, :no_glass]

  def self.current
    Bartender.first || Bartender.create!
  end

  def online?
    !offline?
  end
end
