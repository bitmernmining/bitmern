import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Bitmern Mining
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Bitcoin mining infrastructure &amp; hosting — coming soon.
        </p>
      </div>
      <Link
        href="/components"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        View Component Library
      </Link>
    </div>
  );
}
