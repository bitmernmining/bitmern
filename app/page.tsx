import Link from "next/link";

export default function Home() {
  return (
    <div className="px-[5%]">
      <div className="mx-auto w-full max-w-[80rem] py-28">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
          <div>
            <h1>Bitmern Mining</h1>
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
      </div>
    </div>
  );
}
