# Find Your Park

This is a NextJS project using `@vis.gl/react-google-maps` and the [`NPS.gov`](https://www.nps.gov/subjects/developer/api-documentation.htm#/thingstodo/getThingstodo) API to make National Park and other site information more accessible and available.

## Big Goals

- [x] Replace list of parks with list from `/articles` endpoint
- [x] Make `/park` route & page for specific parks to show all their info
- [x] Look into NextJS caching stuff for `fetch` requests from NPS and `src/app/.tsx`
- [x] Improve `/parks/parkCode` route
- [ ] Improve `/` root route
- [x] Add `/people/person` route
- [ ] Add live webcams from `/webcams&pardCode=parkCode` to `/parks/parkCode` route
- [x] Add [clerk](https://clerk.com/docs/quickstarts/nextjs) for user authentication/sign-up/sign-in
- [x] Deploy it!
- [x] Connect supabase DB
- [ ] Look into server actions for supabase stuff so nothing DB related happens client side
- [ ] Add ability to select parks and plan a road trip!
- [x] Add ability to favorite parks
- [x] Add ability to track which parks you've visited
- [x] Add user profile route to show user's info (visited parks for now)
- [ ] Improve user profile route
- [ ] Redo `/parks/[park]` route to server side render more stuff
