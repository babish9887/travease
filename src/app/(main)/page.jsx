"use client";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import guideList from "../../../guide.json";
import { Badge } from "../../components/ui/badge";

const page = () => {
  const [search, setSearch] = useState();
  const [filteredList, setFilteredList] = useState([]);
  console.log(guideList);

  const handleChange = (e) => {
    if (e.target.value.length < 4) return;
    const data = guideList.filter((guide) =>
      guide.currently_in.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(data);
    setFilteredList(data);
  };

  return (
    <main className="w-full px-10 relative min-h-screen bg-main-background pb-5">
      <div className="w-full flex justify-center items-center mt-5 pt-6">
        <Input
          icon
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
          className="font-medium rounded-xl w-96 text-base"
        />
      </div>

      <div className="w-full rounded-2xl h-[28rem] relative mt-12 z-20 bg-[url('/main.jpg')] bg-cover bg-center">
        <div
          className="bg-[#163314]/90 rounded-3xl h-full md:w-1/2  xl:w-1/3 w-full absolute py-4 px-10 sm:px-12 xl:px-12
        "
        >
          <div className="md:w-full xl:w-3/4 w-2/3 sm:w-3/4 mt-6">
            <h2 className="sm:text-6xl text-5xl leading-snug font-bold lg:leading-[1.2] text-white text-left">
              Explore<span className="text-orange"> the world</span> with us
            </h2>
          </div>

          <div>
            <h4 className="text-white mt-4 text-xl font-semibold">
              Discover possibilties of travelling!
            </h4>
            <Button
              className="mt-5 rounded-full bg-orange hover:bg-orange/90 px-8 text-lg"
              size="lg"
            >
              <Link href={"#"}>Explore</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full flex flex-col justify-center items-center">
        <h2 className="mt-5 text-3xl font-bold">Our Guides</h2>
        <div className="w-auto grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {guideList.map((item) => {
            return (
              <div
                className={`w-80 sm:w-60 h-[22rem] xl:w-72 aspect-square bg-secondary-background rounded-3xl flex flex-col justify-end gap-y-4 hover:scale-105 transition-all cursor-pointer bg-no-repeat bg-center bg-cover`}
                style={{ backgroundImage: `url(${item.image})` }}
                key={item.id}
              >
                {/* <img src={item.image} alt="" className="object-cover h-3/5 w-full rounded-t-3xl" /> */}
                <div className="flex py-4 px-6 flex-col rounded-3xl w-full h-2/5 bg-main-green text-white items-start">
                  <h1 className="text-xl font-medium">{item.name}</h1>
                  <p className="text-lg font-thin">{item.currently_in}</p>
                  <Badge
                    className={`mt-4 ${
                      item.available ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {item.available ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
