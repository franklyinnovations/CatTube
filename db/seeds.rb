# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
	videos = Video.all

	User.create!(username: 'bar', password: 'foobar')
	User.create!(username: 'baz', password: 'foobar')
	User.create!(username: 'qux', password: 'barfoo')
	User.create!(username: 'a', password: 'barfoo')
	User.create!(username: 'b', password: 'barfoo')
	User.create!(username: 'c', password: 'barfoo')

	users = User.all

	# create comments
	users.each do |user|
		videos.each do |video|
			chance_to_comment = 75

			if chance_to_comment >= rand(0..100)
				chance_to_comment_on_nested_comment = 50

				parent_id = nil

				if chance_to_comment_on_nested_comment >= rand(0..100)

					comment_list = Comment.where('comments.parent_id IS NULL AND comments.video_id = ?', [video.id])

					parent_id = comment_list.sample.id if comment_list.length > 0
				end

				comment_body = SecureRandom::urlsafe_base64(rand(10..50))
				comment = Comment.create!(body: comment_body, user_id: user.id, video_id: video.id, parent_id: parent_id);
			end
		end
	end

	# create likes
	users.each do |user|
		videos.each do |video|
			chance_to_like = 100

			if user.id != video.user.id && chance_to_like >= rand(0..100)
				like_value = [-1, 1].sample
				Like.create!(user_id: user.id, video_id: video.id, value: like_value)
			end
		end
	end
end
