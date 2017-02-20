# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
	# generate a list of default users
	users_name_array = ['foo', 'bar', 'baz', 'qux']
	6.times do
		users_name_array << Faker::Hacker.noun.gsub(/\s/, '')
	end

	users_name_array.each do |username|
		unless User.exists?(username: username)
			User.create!(username: username, password: 'foobar')
		end
	end

	users = User.all

	# create a different avatar thumbnail for each default user
	avatar_files = [
		File.open("app/assets/images/cat-1652822_640.jpg"),
		File.open("app/assets/images/cat-188088_640.jpg"),
		File.open("app/assets/images/cat-207583_640.jpg"),
		File.open("app/assets/images/cat-300572_640.jpg"),
		File.open("app/assets/images/cat-360807_640.jpg"),
		File.open("app/assets/images/cat-379117_640.jpg"),
		File.open("app/assets/images/cat-401124_640.jpg"),
		File.open("app/assets/images/cat-520894_640.jpg"),
		File.open("app/assets/images/cat-56753_640.jpg"),
		File.open("app/assets/images/cat-778315_640.jpg")
	]

	users.each_with_index do |user, idx|
		user.avatar = avatar_files[idx % avatar_files.size]
		user.save!
	end

	avatar_files.each { |file| file.close }

	# upload "cats with human mouth.mp4" many, many times
	video_duplicates = 100;
	video_files = [
		File.open("app/assets/videos/cats_go_meow_markiplier.mp4"),
		File.open("app/assets/videos/cats_love_pizza.mp4"),
		File.open("app/assets/videos/cats_with_human_mouth.mp4"),
		File.open("app/assets/videos/funny_videos_cats_talking.mp4"),
		File.open("app/assets/videos/japanese_cats_say_nyan_not_meow.mp4"),
		File.open("app/assets/videos/yelling_cat.mp4"),
		File.open("app/assets/videos/bad_cats.mp4"),
		File.open("app/assets/videos/cat_dancing_with_michael_jackson_song.mp4"),
		File.open("app/assets/videos/cat_on_a_lead_indoor_cats_outdoors_cat_goes_for_walkies.mp4"),
		File.open("app/assets/videos/cats_love_it!.mp4"),
		File.open("app/assets/videos/cheetoh_cat_sees_owners_for_first_time_in_days.mp4"),
		File.open("app/assets/videos/diabetic_cats_strange_walk.mp4"),
		File.open("app/assets/videos/funny_cucumber_cat_prank_2016.mp4"),
		File.open("app/assets/videos/kung_fu_cat_hits_2_dogs_upon_the_air.mp4"),
		File.open("app/assets/videos/cico_fat_cat.mp4")
	];

	video_duplicates.times.each do |i|
		video = Video.new(title: "foo #{i}", description: "bar #{i}", user_id: users[0].id)
		video.data = video_files.sample
		video.save!
	end

	video_files.each { |file| file.close }
	videos = Video.all

	# change video descriptions, titles, and user_id
	videos.each do |video|
		title = 'Cats and ' + Faker::Company.catch_phrase
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
				unless Like.exists?(user_id: user.id, video_id: video.id)
					Like.create!(user_id: user.id, video_id: video.id, value: like_value)
				end
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
