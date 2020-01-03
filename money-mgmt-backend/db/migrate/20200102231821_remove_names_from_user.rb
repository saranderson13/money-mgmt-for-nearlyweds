class RemoveNamesFromUser < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :firstName, :string
    remove_column :users, :lastName, :string
  end
end
