## User Stories and The Ask

### Movie Database App

Find your next movie or create your watchlist with this App. It include reviews, rating, actors and anything you need to know about the movie.
This application will help users find their next movie to watch by showing helpful stats
Resource needed for the project is movie api, examples include Imdb, MovieDB etc.
 
### User Stories:
- ✅ User can see all the latest movie on the front page
- ✅ User can scroll through additional results according to release date
- ✅ User can click on any of the movie to go to their own separate page
- ✅ User can then see all about the movie ratings, about, actors present on each separate movie page
 
### Stretch Goals:
- User can filter movies by partial text string
- ✅ Implement proper pagination
- User can create an account
- User can create their own watch list
- User can review movies
 
### Bonus features:
- Add some Playwright tests to run your tests automatically
- Illustrate how we can utilize NextJS for this challenge (Specifically service-side rendering)
 
### Useful links and resources:
[MovieDB Api](https://developers.themoviedb.org/3)
 
### Evaluation Criteria:
- Code quality and structure
- Ability to write clear, maintainable, and reusable code
- Look and feel of the UI, interactions make sense and flow smoothly
- (Bonus) Playwright tests
- (Bonus) NextJS integrations (service-side rendering)

## Installation

This applciation environment has been configured using `node` `v22.x`, and uses `[pnpm](https://pnpm.io/installation)` as it's package manager. With nodejs properly installed, from the `./frontend` folder, you may run the following commands to run the development environment:

```sh
corepack enable
corepack prepare pnpm@latest --activate
pnpm --version
```

Then,

```sh
which node
pnpm install
pnpm run dev
```

## Dependencies, Libraries and Addons
> NOTE: TODO: For the moment this is intentionally barebones. This requires further documentation.

For the sake of efficiency, I have included a handful of packages, tools, libraries and add-ons. A high-level overview is as follows:

- [Supabase (Auth)](https://supabase.com/auth) `@supabase/supabase-js`
   - _Supabase Authentication_ has been chosen to handle the (potential) user auth provider guarding the `./app/protected` route.
   - This is a stretch goal, for the moment, and knowingly will impact build-size and project complexity, but I intentionally included it with a mindset as the roadmap unfolds.
- [shadcn/ui](https://ui.shadcn.com/docs)
   - Purely a pragmatic decision, `shadcn/ui` was selected due to familiarity/comfort with the framework. The intention is to use this for the `Sidebar` and `ScrollArea` components, as current constrants do not make a from-scratch responsive/nested sidebar compoent practical. 
 - _More to come…_

## Framework Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
