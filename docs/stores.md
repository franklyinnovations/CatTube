# Flux Stores

<!-- *********************************************************************** -->
<!-- *********************************************************************** -->

## Home Page

### SearchSuggestionStore
Holds suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchBar`

### RecentlyViewedStore
Holds recently viewed videos for user (or random otherwise).

##### Actions:
- `receiveRecentlyViewed`

##### Listeners:
- `PopularIndex`

### FeaturedVideoStore
Holds featured video.

##### Actions:
- `receiveFeaturedVideo`

##### Listeners:
- `FeaturedVideo`

### RecommendedVideoStore
Holds recommended videos.

##### Actions:
- `receiveRecommendedVideos`

##### Listeners:
- `RecommendedIndex`

### RecommendedChannelStore
Holds recommended channels, with each channel containing several videos each.

##### Actions:
- `receiveRecommendedChannels`
- `receiveMoreRecommendedChannels`

##### Listeners:
- `RecommendedChannelIndex`

<!-- *********************************************************************** -->
<!-- *********************************************************************** -->

## Video Page

### SearchSuggestionStore
Holds suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchBar`

### VideoInfoStore
Holds information about the current video.

##### Actions:
- `receiveVideoInfo`

##### Listeners:
- `VideoBar`

### CommentsStore
Holds comments for the current video.

##### Actions:
- `receiveComments`
- `receiveMoreComments`

##### Listeners:
- `CommentIndex`

### RecommendedVideoStore
Holds recommended videos.

##### Actions:
- `receiveRecommendedVideos`

##### Listeners:
- `VideoIndex`

<!-- *********************************************************************** -->
<!-- *********************************************************************** -->

## Search Page

### SearchSuggestionStore
Holds suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchBar`

### SearchVideoStore
Holds results for video search.

##### Actions:
- `receiveSearchedVideos`

##### Listeners:
- `SearchIndex`

<!-- *********************************************************************** -->
<!-- *********************************************************************** -->

## Channel Page

### SearchSuggestionStore
Holds suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchBar`

### ChannelVideoStore
Holds videos for the current channel.

##### Actions:
- `receiveChannelVideos`

##### Listeners:
- `UploadIndex`

<!-- *********************************************************************** -->
<!-- *********************************************************************** -->

## Upload Page

### ProgressBarStore
Holds progress (upload) percent status.

##### Actions:
- `receiveProgressBar`

##### Listeners:
- `Progress`

### ThumbnailStore
Holds thumbnail for the uploaded video.

##### Actions:
- `receiveThumbnail`

##### Listeners:
- `Thumbnail`
