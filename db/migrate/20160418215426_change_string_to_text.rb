class ChangeStringToText < ActiveRecord::Migration
  def up
		change_column :comments, :body, :text
		change_column :videos, :title, :text
  end

	def down
		change_column :comments, :body, :string
		change_column :videos, :title, :string
	end
end
