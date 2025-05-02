// TODO: Refactor to use the Figma Hero/Header wireframes

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      {/* <div className="flex gap-8 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div> */}
      <h1 className="sr-only" data-testid="hero-title" data-text="Andy's Films" data-todo="ipsum">Andy's Films</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
      </p>
      {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" /> */}
    </div>
  );
}
