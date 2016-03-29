class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
			t.string :title, null: false
			t.text :description, null: false
			t.integer :user_id, null: false
			t.binary :thumbnail, null: false
			t.string :url, null: false

      t.timestamps null: false
    end

		add_index :videos, :user_id
  end
end
