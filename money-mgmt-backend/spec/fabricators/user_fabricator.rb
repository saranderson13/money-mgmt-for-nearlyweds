Fabricator(:user) do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password 'password'
    role { ["Bride", "Groom", "Nearlywed"].sample() }
    after_create { |u| Fabricate(:savings_plan, user_id: u.id) }
end