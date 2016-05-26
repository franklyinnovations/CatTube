module Paperclip
	class VideoThumbnail < Paperclip::Processor
		attr_accessor :time_offset, :geometry, :whiny

		def initialize(file, options = {}, attachment = nil)
			super

			unless options[:geometry].nil? || (@geometry = Paperclip::Geometry.parse(options[:geometry])).nil?
				@geometry.width = (@geometry.width / 2.0).floor * 2.0
				@geometry.height = (@geometry.height / 2.0).floor * 2.0
				@geometry.modifier = ''
			end

			@whiny = options[:whiny].nil? ? true : options[:whiny]
			@basename = File.basename(file.path, File.extname(file.path))

			preferred_offset = options[:time_offset] || 0;
			video_duration = self.get_video_duration
			@time_offset = "-#{[preferred_offset, video_duration].min}"
		end

		def make
			dst = Tempfile.new([@basename, 'jpg'].compact.join("."))
			dst.binmode

			cmd = %Q[-itsoffset #{time_offset} -i "#{File.expand_path(file.path)}" -y -vcodec mjpeg -vframes 1 -an -f rawvideo "#{File.expand_path(dst.path)}"]

			begin
				success = Paperclip.run('ffmpeg', cmd)
			rescue PaperclipCommandLineError
				raise PaperclipError, "There was an error processing the thumbnail for #{@basename}" if whiny
			end

			process_thumbnail(dst)
		end

		def get_video_duration
			cmd = "-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 #{File.expand_path(file.path)}"

			begin
				duration = Paperclip.run("ffprobe", cmd).chomp;
			rescue PaperclipCommandLineError
				raise PaperclipError, "There was an error processing the video duration for #{@basename}" if whiny
			end

			Float(duration).to_i
		end

		def process_thumbnail(dst)
			new_thumb = Tempfile.new([@basename, "jpg"].compact.join("."))
			cmd = "#{File.expand_path(dst.path)} -resize #{@geometry.to_s} -background '#eeeeee' -gravity center -extent #{@geometry.to_s} #{File.expand_path(new_thumb.path)}"

			begin
				success = Paperclip.run("convert", cmd)
			rescue PaperclipCommandLineError
				raise PaperclipError, "There was an error resizing the video thumbnail for #{@basename}" if whiny
			end

			new_thumb
		end

	end
end
