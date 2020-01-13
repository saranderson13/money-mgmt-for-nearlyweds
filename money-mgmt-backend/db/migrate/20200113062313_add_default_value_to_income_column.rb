class AddDefaultValueToIncomeColumn < ActiveRecord::Migration[6.0]
  def change
    change_column :savings_plans, :income_per_month, :integer, default: 0
  end
end
