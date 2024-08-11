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
        <div className="w-auto grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {guideList.map((item) => {
            return (
              // <div
              //   className={`w-80 sm:w-60 h-[22rem] xl:w-72 aspect-square bg-secondary-background rounded-3xl flex flex-col justify-end gap-y-4 hover:scale-105 transition-all cursor-pointer bg-no-repeat bg-center bg-cover`}
              //   style={{ backgroundImage: `url(${item.image})` }}
              //   key={item.id}
              // >
              //   {/* <img src={item.image} alt="" className="object-cover h-3/5 w-full rounded-t-3xl" /> */}
              //   <div className="flex py-4 px-6 flex-col rounded-3xl w-full h-2/5 bg-main-green text-white items-start">
              //     <h1 className="text-xl font-medium">{item.name}</h1>
              //     <p className="text-lg font-thin">{item.currently_in}</p>
              //     <Badge
              //       className={`mt-4 ${
              //         item.available ? "bg-green-600" : "bg-red-600"
              //       }`}
              //     >
              //       {item.available ? "Available" : "Not Available"}
              //     </Badge>
              //   </div>
              // </div>
              // <Card className="w-auto max-w-[26rem] h-[26rem] shadow-lg">
              //   <CardHeader floated={false} color="blue-gray">
              //     <img src={item.image} />
              //     <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              //   </CardHeader>
              //   <CardBody className="px-5 py-2">
              //     <div className="mb-3 flex items-center justify-between">
              //       <Typography
              //         variant="h5"
              //         color="blue-gray"
              //         className="font-medium"
              //       >
              //         {item.name}, {item.currently_in}
              //       </Typography>
              //       <Typography
              //         color="blue-gray"
              //         className="flex items-center gap-1.5 font-normal"
              //       >
              //         <svg
              //           xmlns="http://www.w3.org/2000/svg"
              //           viewBox="0 0 24 24"
              //           fill="currentColor"
              //           className="-mt-0.5 h-5 w-5 text-yellow-700"
              //         >
              //           <path
              //             fillRule="evenodd"
              //             d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              //             clipRule="evenodd"
              //           />
              //         </svg>
              //         {item.rating}
              //       </Typography>
              //     </div>
              //     <Typography color="gray" className="truncate">
              //       {item.description}
              //     </Typography>
              //     <div className="group mt-4 inline-flex flex-wrap items-center gap-3">
              //       <Badge
              //         className={`${
              //           item.available ? "bg-green-600" : "bg-red-600"
              //         } px-2`}
              //       >
              //         {item.available ? "Available" : "Not Available"}
              //       </Badge>
              //     </div>
              //   </CardBody>
              //   <CardFooter className="pt-0">
              //     <Link href={`/guide/${item.id}`}>
              //       <Button
              //         size="lg"
              //         fullWidth={true}
              //         className="hover:bg-orange/70 w-full mt-3"
              //       >
              //         Explore
              //       </Button>
              //     </Link>
              //   </CardFooter>
              // </Card>
              <Card className="">
                <CardHeader shadow={false} floated={false} className="h-64">
                  <img
                    src={item.image}
                    alt="card-image"
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      {item.name}, {item.currently_in}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium relative">
                      <span className="absolute top-0 text-sm">$</span>{item.fee}/h
                    </Typography>
                    {/* <Badge
                      className={`${
                        item.available ? "bg-green-600" : "bg-red-600"
                      } px-1`}
                    >
                      {item.available ? "Available" : "Not Available"}
                    </Badge> */}
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal truncate opacity-75"
                  >
                    {item.description}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    Add to Cart
                  </Button>
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
