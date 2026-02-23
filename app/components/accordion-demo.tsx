"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What coins can I mine?</AccordionTrigger>
        <AccordionContent>
          Bitmern supports solo mining for BTC, LTC, DOGE, BCH, and DGB.
          Connect your ASIC and start mining within minutes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Are there any pool fees?</AccordionTrigger>
        <AccordionContent>
          Zero pool fees on our solo mining pools. You keep 100% of the block
          reward when you find a block.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What hardware do you support?</AccordionTrigger>
        <AccordionContent>
          We support all major ASIC miners including Antminer, Whatsminer,
          and Avalon series. GPU mining is available for select algorithms.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
