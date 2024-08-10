"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import guideList from '../../../guide.json'
const page = () => {
      const [search, setSearch]=useState();
      const [filteredList, setFilteredList]=useState([])
      console.log(guideList)

      const handleChange=(e)=>{
            if(e.target.value.length<4) return;
            const data=guideList.filter((guide)=>guide.currently_in.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(data)
            setFilteredList(data)
            
      }
   
  return (
    <main className="w-full px-10 relative h-[calc(100vh-100px)] bg-main-background">
      <div className="w-full flex justify-center items-center mt-5 pt-6">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
          className=" font-medium rounded-full w-96 text-base"
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
    </main>
  );
};

export default page;
