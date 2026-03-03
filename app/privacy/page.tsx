import type { Metadata } from "next";
import { PrivacyContent } from "@/components/pages/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy — Bitmern Mining",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
