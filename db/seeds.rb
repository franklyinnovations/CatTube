# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do

	videos = []
	users = []

	users << User.create!(username: 'foo', password: 'foobar')
	users << User.create!(username: 'bar', password: 'foobar')
	users << User.create!(username: 'baz', password: 'foobar')
	users << User.create!(username: 'qux', password: 'barfoo')

	title = 'Best Cats VINES COMPILATION'
	description = 'Creative Commons Video on Cats!'
	user_id = users.sample.id;

	videos << Video.create!(title: title, description: description, user_id: user_id);

	file = File.open('app/assets/videos/cats.mp4')
	first = Video.find(1)
	first.video = file
	first.save!

	5.times do
		body = SecureRandom::urlsafe_base64(rand(10..20))

		Comment.create!(body: body, user_id: users.sample.id, video_id: videos.sample.id);
	end

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
