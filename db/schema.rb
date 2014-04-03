# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140325213704) do

  create_table "heats", force: true do |t|
    t.integer  "race_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "heats", ["race_id"], name: "index_heats_on_race_id", using: :btree

  create_table "racer_stats", force: true do |t|
    t.integer  "heat_id"
    t.integer  "user_id"
    t.float    "wpm"
    t.float    "wpm_percentile"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "racer_stats", ["heat_id"], name: "index_racer_stats_on_heat_id", using: :btree
  add_index "racer_stats", ["user_id"], name: "index_racer_stats_on_user_id", using: :btree

  create_table "races", force: true do |t|
    t.text     "passage"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "source",     null: false
  end

  add_index "races", ["passage"], name: "index_races_on_passage", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
