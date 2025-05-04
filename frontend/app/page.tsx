// VDR

import Hero from "@/components/hero";
// import FilmMetadata from "@/components/films/FilmMetadata";
import NewReleases from "@/components/films/NewReleases";

// TODO: Add a new releases section
// TODO: Link to Release page and add film metadata section
// TODO: Add a search bar
// TODO: Add user profile section to protected route

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-4 w-full h-full">
        <NewReleases
          displayQuantity={5}
          variant="cards"
        />

        {/* <FilmMetadata id={123} /> */}
      </main>
    </>
  );
}

