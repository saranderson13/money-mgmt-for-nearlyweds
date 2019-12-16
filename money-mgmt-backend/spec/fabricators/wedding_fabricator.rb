Fabricator(:wedding) do
  date        { Faker::Date.forward(days: 730) }
  website     { Faker::Internet.url }
  registry    { Faker::Internet.url }
  guest_count { rand(50..400) }
  after_create do |w| 
    Fabricate(:color_palette, wedding_id: w.id)
    Fabricate(:budget, wedding_id: w.id)
    2.times { Fabricate(:user, wedding_id: w.id) }
  end
end