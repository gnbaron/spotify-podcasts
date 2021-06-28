# Spotify Podcasts 🎙

Third party app to explore Spotify podcasts/episodes and manage your library.

![demo](https://podcasts.gnbaron.com/img/demo.png)

## 🚀 Built with

- [Typescript](https://www.typescriptlang.org/)
- [React](https://github.com/facebook/react/)
- [Next.js](https://nextjs.org/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [React Query](https://github.com/tannerlinsley/react-query/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress](https://www.cypress.io/)

Even though this was built on [Next.js](https://nextjs.org/) runtime framework I opted for mostly not using `next/router` and `next/link` as I was exploring the idea of creating a "hybrid" single page app experience (content sits behind a login anyway and SEO wasn't a requirement) where I can throw some SSR/SSG in the mix if needed.
The login page for example is static while a new landing page could be SSR/SSG or even rendered on client side.
The cool part about it is that we have most of the other Next.js benefits like close to zero config, `Image` component and so on while doing client routing with [react-router](https://reactrouter.com/).

The content is provided by the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) and I've used [react-query](https://github.com/tannerlinsley/react-query/) for managing server state and data fetching.

On the testing side, I've used [jest](https://jestjs.io/) as the test runner and [react testing library](https://testing-library.com/docs/react-testing-library/intro/) for few unit tests, while most of the coverage is done by [cypress](https://www.cypress.io/) e2e tests. Testing data is produced by a [Fishery](https://github.com/thoughtbot/fishery) factory which uses [Faker.js](https://github.com/marak/Faker.js/) under the hood.

## 👋 Comments

If you have any suggestion, question or comment feel free to reach out.

## 📝 License

This project is licensed under the [MIT](https://github.com/gnbaron/spotify-podcasts/blob/main/LICENSE) license.
