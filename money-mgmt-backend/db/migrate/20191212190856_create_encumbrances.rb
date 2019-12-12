class CreateEncumbrances < ActiveRecord::Migration[6.0]
  def change
    create_table :encumbrances do |t|
      t.belongs_to :savings_plan
      t.string :name
      t.integer :amount
      t.string :frequency

      t.timestamps
    end
  end
end
