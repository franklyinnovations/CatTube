class CreateViews < ActiveRecord::Migration
  def change
    create_table :views do |t|
			t.integer :video_id, null: false
			t.integer :user_id

      t.timestamps null: false
    end

		add_index :views, :video_id
		add_index :views, :user_id
  end
end
