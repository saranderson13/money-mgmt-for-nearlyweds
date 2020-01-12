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
    guest_count: 200
)

deez_nups.build_expenses(
    venue: 8000,
    catering: 5000,
    photography: 1000,
    videography: 0,
    flowers: 600,
    cake: 800,
    attire: 2500,
    band: 0,
    djmc: 0,
    invitations: 500,
    favors: 700,
    officiant: 0,
    beauty: 400,
    jewelry: 500,
    rentals: 1000,
    other: 100
)

bride = User.create(
    first_name: "Sarah",
    last_name: "Anderson", 
    role: "Bride", 
    wedding: deez_nups,
    email: "sarah@gmail.com",
    password: "sto0fski"
)

bsp = bride.build_savings_plan(income_per_month: 2500)
bsp.encumbrances.build(encumbrance_name: "rent", amount: 575)
bsp.encumbrances.build(encumbrance_name: "student loans", amount: 330)
bsp.encumbrances.build(encumbrance_name: "car insurance", amount: 150)
bsp.encumbrances.build(encumbrance_name: "internet", amount: 85)
bride.save

groom = User.create(
    first_name: "Cameron",
    last_name: "Bailey",
    role: "Groom",
    wedding: deez_nups,
    email: "cameron@gmail.com",
    password: "sto0fski"
)

gsp = groom.build_savings_plan(income_per_month: 3300)
gsp.encumbrances.build(encumbrance_name: "rent", amount: 575)
gsp.encumbrances.build(encumbrance_name: "student loans", amount: 400)
gsp.encumbrances.build(encumbrance_name: "utilities", amount: 100)
gsp.encumbrances.build(encumbrance_name: "phone", amount: 100)
groom.save


deez_nups.build_color_palette(primary: "FFFEFC", secondary: "232323", accent1: "FFE1E0", accent2: "443851", accent3: "A1B5A6")
deez_nups.save
