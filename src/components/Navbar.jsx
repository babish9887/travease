"use client";
import Link from "next/link";
<<<<<<< HEAD
import React, { useRef, useState } from "react";
import { Earth, Menu } from "lucide-react";
=======
import React, { useRef, useState , useEffect} from "react";
import { Input } from "./ui/input";
import { Menu } from "lucide-react";
>>>>>>> d706179562140efd6b2f94af482311c5a17aed39
import { Button } from "./ui/button";
import axios from "axios";
const Navbar = () => {

      const [user, setUser]=useState(null)

      useEffect(()=>{
            async function getUser(){
                  await axios.get('/api/checkcookie')
                  .then((res)=>{
                        console.log(res.data)
                        setUser(false)

                  })
            }
            getUser()
      },[user])
  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="w-full flex justify-between items-center py-5 px-10 sticky top-0 bg-main-background z-50">
      <div className="flex gap-2 items-center">
        <Earth className="h-7 w-7 text-orange" />
        <Link
          href={"/"}
          className="font-extrabold lg:text-3xl text-2xl text-black"
        >
          Travease
        </Link>
      </div>
      <div className="md:flex items-center gap-8 lg:gap-12 font-semibold hidden text-lg">
        <Link href={"/"} className="hover:text-orange">
          Home
        </Link>
        <Link href={"#"} className="hover:text-orange">
          Our offer
        </Link>
        <Link href={"#"} className="hover:text-orange">
          Booking
        </Link>
        <Link href={"/faq"} className="hover:text-orange">
          FAQ
        </Link>
      </div>

      {/* <div className="flex">
        <Input
          type="text"
          placeholder="Search..."
          className="rounded-full placeholder-black"
        />
      </div> */}

      <div className="flex md:hidden flex-col items-end" ref={ref}>
        <Menu
          onClick={() => setShowMenu((value) => !value)}
          className="h-10 w-10 rounded-full p-2 hover:[#DFD9CE] transition"
        />
        {showMenu ? (
          <div className="absolute flex-col flex mt-10 bg-white  px-3 py-4 rounded-lg text-sm font-medium gap-1 w-2/5 text-center z-50">
            <Link
              href={"/"}
              className=" hover:bg-gray-100 hover:text-black  text-gray-500 rounded-md px-2 py-1 w-full transition"
            >
              Home
            </Link>
            <Link
              className=" hover:bg-gray-100 hover:text-black text-gray-500 rounded-md px-2 py-1 w-full transition"
              href={"#"}
            >
              Our offer
            </Link>
            <Link
              className=" hover:bg-gray-100 hover:text-black text-gray-500 rounded-md px-2 py-1 w-full transition"
              href={"#"}
            >
              Booking
            </Link>
            <Link
              className=" hover:bg-gray-100 hover:text-black text-gray-500 rounded-md px-2 py-1 w-full transition"
              href={"/faq"}
            >
              FAQ
            </Link>

            <div className="flex flex-col gap-2">
<<<<<<< HEAD
              <Link href={"/user/login"}>
                <Button
                  className="bg-orange text-white hover:bg-orange/80"
                  variant="secondary"
                  size="sm"
                >
                  Sign in
                </Button>
              </Link>
              <Link href={"/newuser"}>
                <Button className="text-black" variant="ghost" size="sm">
                  Sign up
                </Button>
=======
                  <Link href='/user/login'>
              <Button
                className="bg-orange text-white hover:bg-orange/80"
                variant="secondary"
                size="sm"
                >
                Sign in
              </Button>
                  </Link>
              <Link href={'/newuser'}>
              <Button className="text-black" variant="ghost" size="sm">
                Sign up
              </Button>
>>>>>>> d706179562140efd6b2f94af482311c5a17aed39
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      <div className="md:flex gap-4 hidden">
<<<<<<< HEAD
      <Link href={"/user/login"}>
        <Button
          className="bg-orange text-white text-base hover:bg-orange/80"
          variant="secondary"
        >
          Sign in
        </Button>
        </Link>
        <Link href={"/newuser"}>
          <Button className="text-black" variant="ghost" size="sm">
            Sign up
          </Button>
        </Link>
=======
      <Link href='/user/login'>
              <Button
                className="bg-orange text-white hover:bg-orange/80"
                variant="secondary"
                size="sm"
                >
                Sign in
              </Button>
            </Link>
        <Link href={'/newuser'}>
              <Button className="text-black" variant="ghost" size="sm">
                Sign up
              </Button>
              </Link>
>>>>>>> d706179562140efd6b2f94af482311c5a17aed39
      </div>
    </nav>
  );
};

export default Navbar;
