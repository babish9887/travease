"use client";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { Earth, Menu } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import Image from "next/image";
import {useRouter} from 'next/navigation'
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
const router=useRouter()
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get("/api/checkcookie");
        console.log(res.data);
        setUser(res.data.user);

        // Check if user data is present before setting the image URL
        if (res.data.user) {
          const userImage = res.data.user.image;
          const imageType = userImage.substring(0, 4);
          setImageUrl(imageType === "http" ? userImage : `/profile_pic/${userImage}.png`);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
    getUser();
  }, []);

  const handlelogout=async ()=>{
      console.log("Hello")
      try {
            await axios.post('/api/logout')
            .then((res)=>{
                  setTimeout(() => {
                        window.location.reload()
                  }, 3000);
            })
      } catch (error) {
            
      }
  }

  return (
    <nav className="w-full flex justify-between items-center py-5 px-10 sticky top-0 bg-main-background z-50">
      <div className="flex gap-2 items-center">
        <Earth className="h-7 w-7 text-orange" />
        <Link href={"/"} className="font-extrabold lg:text-3xl text-2xl text-black">
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

      <div className="flex md:hidden flex-col items-end" ref={ref}>
        <Menu
          onClick={() => setShowMenu((prev) => !prev)}
          className="h-10 w-10 rounded-full p-2 hover:[#DFD9CE] transition"
        />
        {showMenu && (
          <div className="absolute flex-col flex mt-10 bg-white px-3 py-4 rounded-lg font-medium gap-1 w-2/5 text-center text-base z-50">
            <Link href={"/"} className="hover:bg-gray-100 hover:text-black text-gray-500 rounded-md px-2 py-1 w-full transition">
              Home
            </Link>
            <Link className="hover:bg-gray-100 hover:text-black text-gray-500 rounded-md px-2 py-1 w-full transition" href={"#"}>
              Our offer
            </Link>
            <Link className="hover:bg-gray-100 hover:text-black text-gray-500 rounded-md px-2 py-1 w-full transition" href={"#"}>
              Booking
            </Link>
            <Link className="hover:bg-gray-100 hover:text-black text-gray-500 rounded-md px-2 py-1 w-full transition" href={"/faq"}>
              FAQ
            </Link>

            {!user ? (
              <div className="flex flex-col gap-2 w-full">
                <Link href={"/newuser"}>
                  <Button className="text-black text-base w-full" variant="ghost" size="sm">
                    Sign up
                  </Button>
                </Link>
                <Link href={"/user/login"}>
                  <Button className="bg-orange text-base text-white w-full hover:bg-orange/80" variant="secondary" size="sm">
                    Sign in
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-12 h-12 self-center cursor-pointer" onClick={handlelogout}>
                <Image src={imageUrl} alt="User Profile" className="w-full h-full rounded-full" width={50} height={50} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="md:flex gap-4 hidden">
        {!user ? (
          <>
            <Link href={"/newuser"}>
              <Button className="text-black text-base" variant="outline">
                Sign up
              </Button>
            </Link>
            <Link href={"/user/login"}>
              <Button className="bg-orange text-white text-base hover:bg-orange/80" variant="secondary">
                Sign in
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center w-full cursor-pointer" onClick={handlelogout}>
            <Image src={imageUrl} alt="User Profile" className="w-12 h-12 rounded-full" width={50} height={50} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
