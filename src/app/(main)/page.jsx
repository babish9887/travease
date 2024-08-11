"use client";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import guideList from "../../../guide.json";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Globe, MapPin } from "lucide-react";

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
      <div className="w-full rounded-2xl h-[34rem] relative mt-8 z-20 bg-[url('/main.jpg')] bg-cover bg-center">
        <div
          className="bg-[#163314]/90 rounded-3xl h-full md:w-1/2  xl:w-1/3 w-full absolute py-4 px-10 sm:px-12 xl:px-12
        "
        >
          <div className="md:w-full xl:w-3/4 w-2/3 sm:w-3/4 mt-6">
            <h2 className="sm:text-6xl text-5xl leading-snug font-bold lg:leading-[1.2] text-white text-left">
              Explore<span className="text-orange"> the Nepal</span> with us
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

      <div className="mt-6 w-full flex flex-col justify-center items-center">
        <h2 className="mt-5 text-2xl md:text-3xl font-extrabold">Our Guides</h2>
        <div className="w-[28rem] px-10 flex justify-center items-center mt-5">
          <Input
            icon
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
            className="font-medium rounded-xl w-[24rem] lg:w-[32rem] px-10 py-8 text-base"
          />
        </div>
        <div className="w-auto grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {guideList.map((item) => {
            return (
              // <Card className="">
              //   <CardHeader shadow={false} floated={false} className="h-64">
              //     <img
              //       src={item.image}
              //       alt="card-image"
              //       className="h-full w-full object-cover"
              //     />
              //   </CardHeader>
              //   <CardBody>
              //     <div className="mb-2 flex items-center justify-between">
              //       <Typography color="blue-gray" className="font-medium">
              //         {item.name}, {item.currently_in}
              //       </Typography>
              //       <Typography
              //         color="blue-gray"
              //         className="font-medium relative"
              //       >
              //         <sup className="absolute -left-2 top-[1px] text-sm">
              //           $
              //         </sup>
              //         {item.fee}/h
              //       </Typography>
              //       {/* <Badge
              //         className={`${
              //           item.available ? "bg-green-600" : "bg-red-600"
              //         } px-1`}
              //       >
              //         {item.available ? "Available" : "Not Available"}
              //       </Badge> */}
              //     </div>
              //     <div className="flex flex-col gap-3">
              //       <Typography
              //         variant="small"
              //         color="gray"
              //         className="font-normal truncate opacity-75"
              //       >
              //         {item.description}
              //       </Typography>

              //       <Typography
              //         variant="small"
              //         color="gray"
              //         className="font-normal truncate opacity-75 flex gap-2 items-center text-base"
              //       >
              //         <MapPin className="h-5 w-5" />
              //         {item.currently_in}, Nepal
              //       </Typography>
              //       <Typography
              //         variant="small"
              //         color="gray"
              //         className="font-normal truncate opacity-75 flex gap-2 items-center text-base"
              //       >
              //         <Globe className="h-5 w-5" />
              //         {item.language}
              //       </Typography>
              //     </div>
              //   </CardBody>
              //   <CardFooter className="pt-0">
              //     <Button
              //       ripple={false}
              //       fullWidth={true}
              //       className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:bg-gray-200 focus:scale-105 focus:shadow-none active:scale-100"
              //     >
              //       Explore
              //     </Button>
              //   </CardFooter>
              // </Card>
              <Card className="">
                <CardHeader shadow={false} floated={false} className=" h-72">
                  <img
                    src={item.image}
                    alt="card-image"
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="pt-4">
                  <div className="mb-1 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      {item.name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      ${item.fee}.00
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal truncate opacity-75 flex gap-1 items-center text-base"
                    >
                      <MapPin className="h-5 w-5" />
                      {item.currently_in}, Nepal
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal truncate opacity-75 flex gap-1 items-center text-base"
                    >
                      <Globe className="h-5 w-5" />
                      {item.language}
                    </Typography>
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Link href={`/guide/${item.id}`}>
                    <Button
                      ripple={false}
                      fullWidth={true}
                      className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:bg-gray-200 focus:scale-105 focus:shadow-none active:scale-100 w-full"
                    >
                      Explore
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
