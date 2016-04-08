# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
	videos = Video.all

	# generate a list of default users
	users_name_array = ['bar', 'baz', 'qux']
	10.times do
		users_name_array << Faker::Hacker.noun.gsub(/\s/, '')
	end

	users_name_array.each do |username|
		unless User.exists?(username: username)
			User.create!(username: username, password: 'foobar')
		end
	end

	users = User.all

	# change video descriptions, titles, and user_id
	videos.each do |video|
		title = 'Cats and ' + Faker::Hipster.word.capitalize
		description = Faker::Hipster.paragraphs(rand(1..3)).join("\n")
		user_id = users.sample.id

		video.update!(title: title, description: description, user_id: user_id)
	end

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

				comment_body = Faker::Hacker.say_something_smart
				comment = Comment.create!(body: comment_body, user_id: user.id, video_id: video.id, parent_id: parent_id);
			end
		end
	end

	# create likes
	users.each do |user|
		videos.each do |video|
			chance_to_like = 75

			if user.id != video.user.id && chance_to_like >= rand(0..100)
				like_value = [-1, 1].sample
				Like.create!(user_id: user.id, video_id: video.id, value: like_value)
			end
		end
	end

	# create views
	users.each do |user|
		videos.each do |video|
			chance_to_view = 25

			if chance_to_view >= rand(0..100)
				number_of_times_viewed = rand(1..10)
				number_of_times_viewed.times do
					View.create!(user_id: user.id, video_id: video.id)
				end
			end
		end
	end

end
