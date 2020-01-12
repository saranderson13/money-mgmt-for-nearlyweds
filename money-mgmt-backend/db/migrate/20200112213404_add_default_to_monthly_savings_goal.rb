class AddDefaultToMonthlySavingsGoal < ActiveRecord::Migration[6.0]
  def change
    change_column :savings_plans, :monthly_savings_goal, :integer, default: 0
  end
end
