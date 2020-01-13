# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_13_062313) do

  create_table "color_palettes", force: :cascade do |t|
    t.integer "wedding_id"
    t.string "primary"
    t.string "secondary"
    t.string "accent1"
    t.string "accent2"
    t.string "accent3"
    t.string "accent4"
    t.string "accent5"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["wedding_id"], name: "index_color_palettes_on_wedding_id"
  end

  create_table "encumbrances", force: :cascade do |t|
    t.integer "savings_plan_id"
    t.string "encumbrance_name"
    t.integer "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["savings_plan_id"], name: "index_encumbrances_on_savings_plan_id"
  end

  create_table "expenses", force: :cascade do |t|
    t.integer "wedding_id"
    t.integer "venue", default: 0
    t.integer "catering", default: 0
    t.integer "photography", default: 0
    t.integer "videography", default: 0
    t.integer "flowers", default: 0
    t.integer "cake", default: 0
    t.integer "attire", default: 0
    t.integer "band", default: 0
    t.integer "djmc", default: 0
    t.integer "invitations", default: 0
    t.integer "favors", default: 0
    t.integer "officiant", default: 0
    t.integer "beauty", default: 0
    t.integer "jewelry", default: 0
    t.integer "rentals", default: 0
    t.integer "other", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["wedding_id"], name: "index_expenses_on_wedding_id"
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "savings_plans", force: :cascade do |t|
    t.integer "user_id"
    t.integer "income_per_month", default: 0
    t.integer "monthly_savings_goal", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "current_savings", default: 0
    t.index ["user_id"], name: "index_savings_plans_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "role"
    t.integer "wedding_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["wedding_id"], name: "index_users_on_wedding_id"
  end

  create_table "weddings", force: :cascade do |t|
    t.datetime "date"
    t.integer "guest_count"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
