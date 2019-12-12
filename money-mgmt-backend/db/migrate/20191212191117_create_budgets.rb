class CreateBudgets < ActiveRecord::Migration[6.0]
  def change
    create_table :budgets do |t|
      t.belongs_to :wedding
      t.integer :venue, default: 0
      t.integer :catering, default: 0
      t.integer :photography, default: 0
      t.integer :videography, default: 0
      t.integer :flowers, default: 0
      t.integer :cake, default: 0
      t.integer :dress_attire, default: 0
      t.integer :band, default: 0
      t.integer :dj_mc, default: 0
      t.integer :invitations, default: 0
      t.integer :favors, default: 0
      t.integer :officiant, default: 0
      t.integer :beauty, default: 0
      t.integer :jewelry, default: 0
      t.integer :rentals, default: 0
      t.integer :other, default: 0

      t.timestamps
    end
  end
end
