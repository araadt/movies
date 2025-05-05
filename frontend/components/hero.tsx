// TODO: Refactor to use the Figma Hero/Header wireframes

import SearchBar from "@/components/search/SearchBar";

export default function Hero() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center min-h-[5svh] my-8 w-full">
      <h1 className="sr-only" data-testid="hero-title" data-text="Andy's Films" data-todo="ipsum">Andy's Films</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center text-pretty">
        Browse, search, and discover. Movies and TV for everyone.
      </p>

      <SearchBar />
    </div>
  );
}
