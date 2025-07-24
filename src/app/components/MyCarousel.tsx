"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "antd";
import { cn } from "@/lib/utils";

import useEmblaCarousel from "embla-carousel-react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";

import "./MyCarousel.css"


const MyCarousel = () => {
  return (
    <div>
      <Basic />
      <MyFadeInCarousel />
      <ParallaxSection />
    </div>
  );
};

export default MyCarousel;

// ------------- Basic -------------

const Basic = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handlePrev = () => api?.scrollPrev();
  const handleNext = () => api?.scrollNext();

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full mx-auto"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 pl-5"
            >
              <div className="p-1">
                <Card className="p-0">
                  <CardContent className="aspect-square p-2">
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-sm">
                      <Image
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        alt="Photo by Drew Beamer"
                        fill
                        className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                      />
                    </AspectRatio>
                    <p className="text-4xl font-semibold text-center mt-3">
                      {index + 1}
                    </p>
                    <h1 className="text-lg font-semibold">
                      Product Title: Testing
                    </h1>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ✅ Custom Navigation Buttons */}
        <div className="absolute top-1/2 left-0 z-10 -translate-y-1/2">
          <Button
            type="primary"
            shape="circle"
            size="large"
            className="rounded-full shadow"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute top-1/2 right-0 z-10 -translate-y-1/2">
          <Button
            type="primary"
            shape="circle"
            size="large"
            className="rounded-full shadow"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </Carousel>

      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} of {count}
      </div>
    </div>
  );
};

const MyFadeInCarousel = () => {
  const [current, setCurrent] = React.useState(0);

  // Auto-play every 3 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      <div className="relative h-[300px]">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={cn(
              "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute z-90 w-full inset-0 flex items-center justify-between px-4">
        <Button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + images.length) % images.length)
          }
          className="bg-black/40 text-white hover:bg-black/60"
        >
          ‹
        </Button>
        <Button
          onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
          className="bg-black/40 text-white hover:bg-black/60"
        >
          ›
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              current === idx ? "bg-white scale-125" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

const images = [
  "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg",
  "https://images.pexels.com/photos/36478/amazing-beautiful-beauty-blue.jpg",
  "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg",
  "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
];

// Array of image URLs to display
const IMAGE_URLS = [
  "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg",
  "https://images.pexels.com/photos/36478/amazing-beautiful-beauty-blue.jpg",
  "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg",
  "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  "https://images.pexels.com/photos/15286/pexels-photo.jpg",
];
const SLIDE_COUNT = IMAGE_URLS.length;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const TWEEN_FACTOR_BASE = 0.2;

const ParallaxSection = () => {
  const OPTIONS: EmblaOptionsType = { loop: true, dragFree: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          // Add a check to ensure the tweenNode exists
          if (tweenNode) {
            tweenNode.style.transform = `translateX(${translate}%)`;
          }
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax);
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {SLIDES.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__parallax">
                <div className="embla__parallax__layer">
                  <img
                    className="embla__slide__img embla__parallax__img"
                    src={IMAGE_URLS[index]}
                    alt="A scenic landscape for the parallax carousel."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const products = [
  {
    id: 1,
    name: "Minimal Wooden Chair",
    price: "$129.99",
    image: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  },
  {
    id: 2,
    name: "Modern Table Lamp",
    price: "$89.00",
    image: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  },
  {
    id: 3,
    name: "Comfy Sofa Set",
    price: "$549.50",
    image: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  },
  {
    id: 4,
    name: "Rustic Wall Clock",
    price: "$39.95",
    image: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  },
  {
    id: 5,
    name: "Smart Bluetooth Speaker",
    price: "$59.99",
    image: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  },
  {
    id: 6,
    name: "Indoor Plant Pot",
    price: "$25.00",
    image: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  },
  {
    id: 7,
    name: "Elegant Floor Lamp",
    price: "$112.30",
    image: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  },
  {
    id: 8,
    name: "Designer Bookshelf",
    price: "$210.00",
    image: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  },
];
