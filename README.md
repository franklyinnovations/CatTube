# CatTube

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

CatTube is a web application inspired by YouTube built using Ruby on Rails and React.js; the main purpose of CatTube is to allow users to view and and upload cat themed videos and related content.

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Watch uploaded videos
- [ ] Search uploaded videos by name and filters
- [ ] Create an account
- [ ] Log in / Log out
- [ ] Users can rate and leave comments on videos
- [ ] Users can upload and delete videos

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Basic Video (1.0 days)

**Objective:** Create barebones video and home page and allow users to watch video.

- [ ] create new project
- [ ] create `Video` model
- [ ] test different ways of serving static assets
- [ ] troubleshoot any issues with playback
- [ ] implement basic page layout for video and home page
- [ ] implement API for videos

### Phase 2: Account Creation and Login (1.0 days)

**Objective:** Implement users and channels associated with users.

- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] user home page (channel)

### Phase 3: Comments and Votes (1.0 days)

**Objective:** Allow logged in users to comment and vote on videos.

- [ ] create `Vote` model
- [ ] create `Comment` model
- [ ] implement `Vote` API
- [ ] implement `Comment` API
- [ ] update the video page with likes and index of comments
- [ ] add comment on video page

### Phase 4: Search Uploaded Videos (1.0 days)

**Objective:** Make the auto suggesting search bar and search results page.

- [ ] create the components for the search bar
- [ ] create the search page

### Phase 5: Upload Videos (1.0 day)

**Objective:** Users can now upload videos to CatTube.

- [ ] test different ways for uploading video content
- [ ] create page to upload videos
- [ ] compress and convert video server side with tools

### Phase 7: Additional Features And Components (2.0 days)

**objective:** Finish other non-critical components on pages.

- [ ] Track views per user account and modify suggestions based on it
- [ ] Complete the floating navbar used on many different pages
- [ ] Complete the footer used on many different pages
- [ ] Complete the video page, home page, channel page, and search page

### Phase 6: Styling (1.5 days)

**Objective:** Start styling in the format of YouTube.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Allow users to vote on comments
- [ ] Allow users to subscribe to channels
- [ ] Allow tags for videos
- [ ] Setup a reverse proxy or CDN to serve static video assets
- [ ] Configure video playback to allow for more advanced options like quality
