import type { Metadata } from "next";
import { CookiesContent } from "@/components/pages/cookies";

export const metadata: Metadata = {
  title: "Cookie Policy — Bitmern Mining",
};

export default function CookiesPage() {
  return <CookiesContent />;
}
