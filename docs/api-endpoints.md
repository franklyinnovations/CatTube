# API Endpoints

## HTML API

### Root (Home)
- `GET /` - loads Home Page

### Videos
- `GET /watch?{:video_id}` - loads Video Page

### Searches
- `GET /results?{:search_query}` - loads Search Page

### Channels
- `GET /channel/:user_id` - loads Home Page

### Uploads
- `GET /upload` - loads Upload Page

### Users
- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session
- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Videos

- `GET /api/videos`
  - Video index/search
  - accepts search by video_id, user_id, title, username
  - returns video_id, user_id, title, and description
- `POST /api/videos`
- `GET /api/videos/:id`
- `DELETE /api/videos/:id`

### Comments

- `GET /api/comments`
  - Index of all comments for a user_id or video_id
- `POST /api/comments`
  - Create a new comment for the provided video_id
- `PATCH /api/comments/:id`
- `DELETE /api/comments/:id`
- `GET /api/comments/:id`

### Likes

- `GET /api/likes`
  - Index of all likes for a user_id or video_id
- `POST /api/likes`
  - Create a new like for the provided video_id
- `DELETE /api/likes/:id`
- `GET /api/likes/:id`
