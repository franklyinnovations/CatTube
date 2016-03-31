class ChangeVideosVideoName < ActiveRecord::Migration
	def self.up
		remove_attachment :videos, :video

		change_table :videos do |t|
      t.attachment :data
    end
	end

	def self.down
    change_table :videos do |t|
      t.attachment :video
    end

		remove_attachment :videos, :data
  end
end
