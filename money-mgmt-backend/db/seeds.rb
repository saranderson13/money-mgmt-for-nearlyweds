# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Wedding.destroy_all


deez_nups = Wedding.create(
    date: DateTime.new(2021, 5, 15,  0,  0,  0), 
    website: "anderson-bailey-wedding.com", 
    registry: "example-registry.com",
    guest_count: 200
)

deez_nups.build_budget(
    venue: 8000,
    catering: 5000,
    photography: 1000,
    videography: 0,
    flowers: 600,
    cake: 800,
    dress_attire: 2500,
    band: 0,
    dj_mc: 0,
    invitations: 500,
    favors: 700,
    officiant: 0,
    beauty: 400,
    jewelry: 500,
    rentals: 1000,
    other: 100
)

bride = User.create(
    name: "Sarah Anderson", 
    role: "Bride", 
    wedding: deez_nups,
    email: "sarah@example.com",
    password: "sto0fski"
)

bsp = bride.build_savings_plan(pay_period_type: "bi-monthly", income_per_pp: 1250)
bsp.encumbrances.build(name: "rent", amount: 575, frequency: "monthly")
bsp.encumbrances.build(name: "student loans", amount: 330, frequency: "monthly")
bsp.encumbrances.build(name: "car insurance", amount: 150, frequency: "monthly")
bsp.encumbrances.build(name: "internet", amount: 85, frequency: "monthly")
bride.save

groom = User.create(
    name: "Cameron Bailey",
    role: "Groom",
    wedding: deez_nups,
    email: "cameron@example.com",
    password: "sto0fski"
)

gsp = groom.build_savings_plan(pay_period_type: "bi-monthly", income_per_pp: 1650)
gsp.encumbrances.build(name: "rent", amount: 575, frequency: "monthly")
gsp.encumbrances.build(name: "student loans", amount: 400, frequency: "monthly")
gsp.encumbrances.build(name: "utilities", amount: 100, frequency: "monthly")
gsp.encumbrances.build(name: "phone", amount: 100, frequency: "monthly")
groom.save


deez_nups.build_color_palette(primary: "FFFEFC", secondary: "232323", accent1: "FFE1E0", accent2: "443851", accent3: "A1B5A6")
deez_nups.save
