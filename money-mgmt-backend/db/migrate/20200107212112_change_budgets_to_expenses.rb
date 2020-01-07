class ChangeBudgetsToExpenses < ActiveRecord::Migration[6.0]
  def change
    rename_table :budgets, :expenses
  end
end
