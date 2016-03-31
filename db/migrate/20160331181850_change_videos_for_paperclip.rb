class ChangeVideosForPaperclip < ActiveRecord::Migration
  def change
		remove_column :videos, :url, :string
		remove_column :videos, :thumbnail, :binary
  end
end
