import React from "react";

const page = () => {
  return (
    <section className="w-full px-10 relative h-[calc(100vh-100px)] bg-main-background">
      <div className="w-full rounded-2xl h-[28rem] relative mt-12 z-20 bg-[url('/faq.jpg')] bg-cover bg-center">
        <div
          className="bg-orange rounded-xl h-full md:w-1/2  xl:w-1/3 w-full absolute py-4 px-10 sm:px-12 xl:px-12 flex flex-col justify-end
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
    </section>
  );
};

export default page;
