class ChangeEncumbranceColumns < ActiveRecord::Migration[6.0]
  def change

    remove_column :encumbrances, :frequency, :string

    rename_column :encumbrances, :name, :encumbrance_name

  end
end
