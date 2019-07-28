class User < ApplicationRecord
  validates :google_uid, uniqueness: true
  validates :name, presence: true

  before_save :ensure_access_token

  def ensure_access_token
    self.access_token ||= SecureRandom.hex(24)
  end
end
