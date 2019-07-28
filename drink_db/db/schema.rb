# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_11_133242) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bartenders", force: :cascade do |t|
    t.integer "status", default: 0
    t.string "ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "enable_payment", default: false
  end

  create_table "bottles", force: :cascade do |t|
    t.integer "location"
    t.string "content"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "liquid_left", default: 0
    t.integer "flow_rate", default: 16
    t.integer "size", default: 900
    t.float "startup_delay", default: 0.0
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "recipe_id"
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "payment_request"
    t.integer "price_cents", default: 0, null: false
    t.string "price_currency", default: "BTC", null: false
    t.index ["recipe_id"], name: "index_orders_on_recipe_id"
  end

  create_table "proportions", force: :cascade do |t|
    t.integer "position"
    t.bigint "recipe_id"
    t.bigint "bottle_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "amount", default: 0
    t.index ["bottle_id"], name: "index_proportions_on_bottle_id"
    t.index ["recipe_id"], name: "index_proportions_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "price_cents", default: 0, null: false
    t.string "price_currency", default: "EUR", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "google_uid"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "access_token"
  end

  add_foreign_key "orders", "recipes"
end
