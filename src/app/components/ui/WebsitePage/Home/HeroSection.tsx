'use client'

import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from 'next/image'
import Container from '@/app/components/shared/Container/Container'

const sliderImages = [
  "https://images.pexels.com/photos/7233356/pexels-photo-7233356.jpeg",
  "https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg",
  "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
  "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg"
]

const HeroSection = () => {
  return (
    <div className="bg-white">
      <Container>
        <Carousel className="w-full">
          <CarouselContent>
            {sliderImages.map((img, index) => (
              <CarouselItem key={index} className="relative h-[300px] md:h-[400px] lg:h-[600px]">
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover rounded-xl"
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </div>
  )
}

export default HeroSection
