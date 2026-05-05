"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group">
      <div
        className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.45)]"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="relative aspect-square min-w-0 flex-[0_0_100%]">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/70 p-3 text-white shadow-lg backdrop-blur-md transition hover:bg-slate-950 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/70 p-3 text-white shadow-lg backdrop-blur-md transition hover:bg-slate-950 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}