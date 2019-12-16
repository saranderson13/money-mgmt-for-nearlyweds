Fabricator(:encumbrance) do
  name      { ["rent", "car loan", "utilities", "student loans", "mortgage", "internet", "phone"].sample() }
  amount    { rand(50..1000) }
  frequency { ["yearly", "monthly", "bi-monthly", "weekly", "daily"].sample() }
end