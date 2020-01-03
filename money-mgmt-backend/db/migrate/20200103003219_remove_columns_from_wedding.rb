class RemoveColumnsFromWedding < ActiveRecord::Migration[6.0]
  def change
    remove_column :weddings, :website, :string
    remove_column :weddings, :registry, :string
  end
end
