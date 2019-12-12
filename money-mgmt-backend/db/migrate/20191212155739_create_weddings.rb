class CreateWeddings < ActiveRecord::Migration[6.0]
  def change
    create_table :weddings do |t|
      t.datetime :date
      t.string :website
      t.string :registry
      t.integer :guest_count

      t.timestamps
    end
  end
end
