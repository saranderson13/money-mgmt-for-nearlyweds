Fabricator(:savings_plan) do
  pay_period_type    { ["monthly", "bi-monthly", "weekly", "daily"].sample() }
  income_per_pp { rand(500..5000) }
  recommended   nil
  custom_amount nil
  projected     nil
  after_create do |sp|
    5.times do 
      Fabricate(:encumbrance, savings_plan_id: sp.id)
    end
  end
end