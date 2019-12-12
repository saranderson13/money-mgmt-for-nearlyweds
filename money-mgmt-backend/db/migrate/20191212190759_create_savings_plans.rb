class CreateSavingsPlans < ActiveRecord::Migration[6.0]
  def change
    create_table :savings_plans do |t|
      t.belongs_to :user
      t.string :pay_period_type
      t.integer :income_per_pp
      t.integer :recommended
      t.integer :custom_amount
      t.integer :projected

      t.timestamps
    end
  end
end
