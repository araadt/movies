import Hero from "@/components/hero";
import FilmMetadata from "@/components/films/metadata";
export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-4">
        <h2 className="font-medium text-lg mb-4">Lorem ipsum steps</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </main>
      <FilmMetadata id={123} />
    </>
  );
}
