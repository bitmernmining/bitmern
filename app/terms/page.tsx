import type { Metadata } from "next";
import { TermsContent } from "@/components/pages/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions — Bitmern Mining",
};

export default function TermsPage() {
  return <TermsContent />;
}
