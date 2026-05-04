"use client";

import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

export default function PriceRangeSlider() {
  const [range, setRange] = useState([0, 1000]);

  return (
    <div className="w-full"> 
      <h3 className="font-semibold mb-3">Price</h3>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        defaultValue={[0, 1000]}
        max={1000}
        step={1}
        value={range}
        onValueChange={setRange}
      >
        {/* The Track */}
        <Slider.Track className="bg-white/30 relative grow rounded-full h-[3.2px]">
          <Slider.Range className="absolute bg-white rounded-full h-full" />
        </Slider.Track>

        {/* Left Handle */}
        <Slider.Thumb
          className="block w-4 h-4 bg-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-pointer"
          aria-label="Minimum Price"
        />

        {/* Right Handle */}
        <Slider.Thumb
          className="block w-4 h-4 bg-white shadow-md rounded-full hover:scale-110 focus:outline-none transition-transform cursor-pointer"
          aria-label="Maximum Price"
        />
      </Slider.Root>

      {/* Labels matching image_667be8.png style */}
      <div className="flex justify-between mt-2 text-sm font-medium">
        <span>{range[0]}</span>
        <span>{range[1]}</span>
      </div>
    </div>
  );
}