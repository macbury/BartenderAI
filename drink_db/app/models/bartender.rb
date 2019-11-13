class Bartender < ApplicationRecord
  enum status: [:offline, :idle, :preparing, :no_glass]
  after_save :push_to_client

  def self.current
    Bartender.first || Bartender.create!
  end

  def online?
    !offline?
  end

  def push_to_client
    DrinkDBSchema.subscriptions.trigger('onBartenderUpdate', {}, self)
  end
end
