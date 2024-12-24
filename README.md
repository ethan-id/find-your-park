# National Parks Finder

This is a NextJS project using `@vis.gl/react-google-maps` and the [`NPS.gov`](https://www.nps.gov/subjects/developer/api-documentation.htm#/thingstodo/getThingstodo) API's information more accessible and available.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Big Goals

- [x] Replace list of parks with list from `/articles` endpoint
- [x] Make `/park` route & page for specific parks to show all their info
- [x] Look into NextJS caching stuff for `fetch` requests from NPS and `src/app/.tsx`
- [x] Improve `/` root route
- [ ] Add [clerk](https://clerk.com/docs/quickstarts/nextjs) for user authentication/sign-up/sign-in
- [ ] Deploy it!
- [ ] Add ability to select parks and plan a road trip!
