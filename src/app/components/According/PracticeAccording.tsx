import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ArrowUpRight } from "lucide-react";

const PracticeAccording = () => {
  return (
    <div className="bg-black mt-10">
      <Accordion type="single" collapsible className="space-y-4">
        {services &&
          services.map((service, index) => (
            <AccordionItem value={service?.id} key={service?.id} className="">
              <AccordionTrigger className="flex items-center gap-4 justify-between px-5 py-8 text-left !pr-0  after:content['']">                
                  <span className="text-gray-400 text-4xl">{`0${
                    index + 1
                  }`}</span>
                  <div className="">
                    <h3 className="text-xl text-white">{service?.title}</h3>
                    <p className="text-gray-500 text-lg">{service?.subtitle}</p>
                  </div>
                  <ArrowUpRight
                    size={30}
                    color="#ffffff"
                    className="shrink-0"
                  />                
              </AccordionTrigger>
              <AccordionContent>
                 <div className="mt-4 w-full">
                <iframe
                  src={service.videoUrl}
                  title={service.title}
                  className="w-full h-64 rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default PracticeAccording;

const services = [
  {
    id: "uiux",
    title: "UIUX Design 1111",
    subtitle:
      "We have several offers related to UIUX Design such as Website Design, Mobile App Design, Prototyping, Wireframe and also Development",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  // {
  //   id: "branding",
  //   title: "Branding",
  //   subtitle:
  //     "We're here to elevate your brand. With professional logo design, corporate identity, brand guidelines, and strategy development services.",
  //   videoUrl: "https://www.youtube.com/embed/videocode2",
  // },
  // {
  //   id: "social",
  //   title: "Social Media",
  //   subtitle:
  //     "Elevate your online presence with our social media expertise. Let's boost your social media game together!",
  //   videoUrl: "https://www.youtube.com/embed/videocode3",
  // },
  // {
  //   id: "marketing",
  //   title: "Digital Marketing",
  //   subtitle:
  //     "Unlock your brand's potential with our digital marketing solutions. Let’s amplify your online presence.",
  //   videoUrl: "https://www.youtube.com/embed/videocode4",
  // },
];
