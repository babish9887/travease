import React from "react";
import { Input } from "./ui/input";
import { Earth } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full relative bottom-0 bg-main-green text-white flex flex-col justify-center items-center py-6">
      <div className="text-center mt-5">
        <h2 className="text-3xl font-semibold">Subscribe to our newsletter</h2>
        <p
          className="mt-3 font-thin text-lg
        "
        >
          Know about our new offers first!
        </p>
        <div className="w-full flex justify-center items-center mt-5">
          <Input
            type="text"
            placeholder="Example@gmail.com"
            className=" font-medium rounded-xl w-96 text-base"
            icon={false}
          />
        </div>
      </div>

      <div className="w-full text-center flex md:flex-row justify-between mt-10 items-center px-10 flex-col">
        <div className="flex gap-2 items-center justify-center mb-2">
          <Earth className="h-5 w-5 text-orange" />
          <h2 className="font-bold text-xl text-white">Travease</h2>
        </div>

        <p className="font-thin">
          Copyright &copy; {new Date().getFullYear()} Travease, All Rights
          Reserved{" "}
        </p>

        <div className="font-thin flex items-center justify-center gap-4">
          <Link href={"#"}>Legal</Link>
          <Link href={"#"}>Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
