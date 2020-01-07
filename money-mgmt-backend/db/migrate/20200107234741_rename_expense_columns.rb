class RenameExpenseColumns < ActiveRecord::Migration[6.0]
  def change
    rename_column :expenses, :dress_attire, :attire
    rename_column :expenses, :dj_mc, :djmc
  end
end
