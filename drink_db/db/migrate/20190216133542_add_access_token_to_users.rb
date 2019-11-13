class AddAccessTokenToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :access_token, :string
    User.all.each(&:save)
  end
end
