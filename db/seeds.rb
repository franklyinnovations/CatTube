# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do

	5.times do
		title = SecureRandom::urlsafe_base64(rand(5..10))
		description = SecureRandom::urlsafe_base64(rand(30..200))
		user_id = rand(0..100);
		thumbnail = SecureRandom::urlsafe_base64(rand(30..100))
		url = title;

		Video.create!(title: title, description: description, user_id: user_id, thumbnail: thumbnail, url: url);
	end

end
