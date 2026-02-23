"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">Select a coin</label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose a coin..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
          <SelectItem value="ltc">Litecoin (LTC)</SelectItem>
          <SelectItem value="doge">Dogecoin (DOGE)</SelectItem>
          <SelectItem value="bch">Bitcoin Cash (BCH)</SelectItem>
          <SelectItem value="dgb">DigiByte (DGB)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
