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

ActiveRecord::Schema.define(version: 20160331181850) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string   "body",       null: false
    t.integer  "user_id",    null: false
    t.integer  "video_id",   null: false
    t.integer  "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["parent_id"], name: "index_comments_on_parent_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree
  add_index "comments", ["video_id"], name: "index_comments_on_video_id", using: :btree

  create_table "likes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "video_id"
    t.integer  "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likes", ["user_id", "video_id"], name: "index_likes_on_user_id_and_video_id", unique: true, using: :btree
  add_index "likes", ["user_id"], name: "index_likes_on_user_id", using: :btree
  add_index "likes", ["video_id"], name: "index_likes_on_video_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

  create_table "videos", force: :cascade do |t|
    t.string   "title",              null: false
    t.text     "description",        null: false
    t.integer  "user_id",            null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "video_file_name"
    t.string   "video_content_type"
    t.integer  "video_file_size"
    t.datetime "video_updated_at"
  end

  add_index "videos", ["user_id"], name: "index_videos_on_user_id", using: :btree

end
