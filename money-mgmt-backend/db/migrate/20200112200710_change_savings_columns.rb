class ChangeSavingsColumns < ActiveRecord::Migration[6.0]
  def change

    remove_column :savings_plans, :pay_period_type, :string
    remove_column :savings_plans, :recommended, :integer
    remove_column :savings_plans, :projected, :integer
    
    rename_column :savings_plans, :income_per_pp, :income_per_month
    rename_column :savings_plans, :custom_amount, :monthly_savings_goal

  end
end
