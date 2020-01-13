class AddCurrentSavingsToSavingsPlans < ActiveRecord::Migration[6.0]
  def change
    add_column :savings_plans, :current_savings, :integer, default: 0
  end
end
