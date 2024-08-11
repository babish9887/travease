"use client";
import React, { useState } from "react";
import faq from "../../../../faq.json";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../@/components/ui/collapsible";
import { ArrowBigUp, ChevronDown, ChevronUp } from "lucide-react";

const page = () => {
  return (
    <section className="w-full px-10 relative h-auto bg-main-background">
      <div className="w-full rounded-2xl h-[28rem] relative mt-12 z-20 bg-[url('/faq.jpg')] bg-cover bg-center">
        <div
          className="bg-orange/70 rounded-xl h-full md:w-1/2  xl:w-1/3 w-full absolute py-4 px-10 sm:px-12 xl:px-12 flex flex-col justify-end
        "
        >
          <div className="md:w-full xl:w-3/4 w-2/3 sm:w-3/4 mt-6">
            <h2 className="sm:text-6xl text-5xl leading-snug font-bold lg:leading-[1.2] text-black text-left">
              FAQ
            </h2>
          </div>

          <div>
            <h4 className="text-black mt-4 text-xl font-semibold">
              Search for answers here!
            </h4>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mt-16 gap-8 pb-8">
        {faq.map((item) => {
          return (
            <div
              key={item.topic}
              className="flex flex-col gap-6 font-medium"
            >
              <h2 className="text-black text-2xl">{item.topic}</h2>
              {item.qna.map((data) => {
                return (
                  <Collapsible key={data.question}>
                    <CollapsibleTrigger className="text-lg text-left py-5 px-6 bg-secondary-background w-full rounded-xl font-medium flex justify-between">
                      {data.question}
                      <span>
                        <ChevronUp />
                      </span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="font-medium text-gray-600 p-6 text-lg">
                      {data.answer}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default page;
