# Find Your Park

This is a NextJS project using `@vis.gl/react-google-maps` and the [`NPS.gov`](https://www.nps.gov/subjects/developer/api-documentation.htm#/thingstodo/getThingstodo) API.

## Tech Stack
- NextJS as the framework
- TypeScript
- Tailwind CSS for mobile-first styling
- Vercel for deployment, prod, and staging env's
- Google's Maps Javascript API for Google Maps integration
- NPS.gov's API for data
- Supabase PostgreSQL DB for storing user information
- Clerk for user management

## Big Goals / To Do's

- [x] Replace list of parks with list from `/articles` endpoint
- [x] Make `/park` route & page for specific parks to show all their info
- [x] Look into NextJS caching stuff for `fetch` requests from NPS and `src/app/.tsx`
- [x] Improve `/parks/parkCode` route
- [ ] Improve `/` root route
- [x] Add `/people/person` route
- [ ] Add live webcams from `/webcams&parkCode=parkCode` to `/parks/parkCode` route
- [x] Add [clerk](https://clerk.com/docs/quickstarts/nextjs) for user authentication/sign-up/sign-in
- [x] Deploy it!
- [x] Connect supabase DB- [ ] Look into server actions for supabase stuff so nothing DB related happens client side
- [ ] Add ability to select parks and plan a road trip!
- [x] Add ability to favorite parks
- [x] Add ability to track which parks you've visited
- [x] Add user profile route to show user's info (visited parks for now)
- [x] Improve user profile route
- [x] Redo `/parks/[park]` route to server side render more stuff
- [x] Add `loading.tsx` to user's parks route
- [x] Make `/people/` route use SSR
- [x] Fix visited/favoriting not working in Prod
- [x] Make `park-map.tsx` auto-zoom so that the entire park's boundaries are within view
- [x] Convert `related-figures.tsx` to a server component
- [x] Add some SEO metadata
- [x] Add support for campgrounds
- [ ] Add route for specific campgrounds
- [x] Add filtering to the homepage so only show specific markers
- [ ] Add UI for showing related campgrounds and parks on their routes
- [ ] Look into switching to BetterAuth instead of Clerk
- [x] Add map on `/user` route to show their visited parks
- [ ] Keep track of each park's page visits
- [x] "Random Park" button that takes a viewer to a random parks page
- [ ] Page to search for parks via tags or other properties
- [ ] Use different icons for user map
- [x] Use MUI's Masonry component for park route
- [ ] Use places data on park route
- [x] Speed up `/` route's load time [(Sped up 50%)](https://github.com/ethan-id/find-your-park/pull/44)

