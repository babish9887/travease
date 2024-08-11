"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Districts from "../../districts.json";

import { Check, ChevronsUpDown } from "lucide-react";
import Languages from "../../Languages.json";
import makeAnimated from "react-select/animated";
import { cn } from "../lib/utils";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import Select from "react-select";
import { Checkbox } from "@radix-ui/react-checkbox";
import toast from "react-hot-toast";

const GuideForm = () => {
  // const [session, setSession]=useState(undefined)
  const animatedComponents = makeAnimated();
  const [number, setNumber] = useState("");
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [certifiedGuide, setCertifiedGuide] = useState(false);
  const [currentlyIn, setCurrentlyIn] = useState("");

  const [fee, setFee] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleLanguageChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions.map((o) => o.value));
  };
  const [places, setPlaces] = useState([]);
  const handlePlaceChange = (selectedPlaces) => {
    setPlaces(selectedPlaces.map((place) => place.value));
  };
  const options = Languages.map((language) => ({
    value: language,
    label: language,
  }));

  const districts = Districts.map((language) => ({
    value: language,
    label: language,
  }));

  let toastId = "";

  const handleSubmit = async () => {
    setIsLoading(true);
    toast.loading("Signing Up", { id: toastId });
    // const image=document.getElementById('pp').value

    console.log(value, selectedOptions, places, certifiedGuide);
    try {
      await axios
        .post("/api/guidesignup", {
          name,
          email,
          password,
          number,
          currently_in: value,
          language: selectedOptions,
          places,
          fee,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Signedup successfully", { id: toastId });
          } else toast.error("Failed", { id: toastId });
        });
    } catch (error) {
      console.log(error);
      toast.error(error, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4 h-auto min-h-screen flex flex-col justify-center sm:w-2/3 md:w-3/6 lg:w-2/6 pb-12">
      <h2 className=" font-bold text-2xl text-center">Register your account!</h2>
      <h4 className="text-center font-medium text-gray-600">As a Guide</h4>

      <form className="bg-white w-auto py-4 px-5 rounded-lg mt-5 flex flex-col gap-y-2">
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Profile Picture
          </label>
          <input
            id="profile"
            type="file"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold" htmlFor="">
              Contact Number
            </label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type="text"
              className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
              disabled={loading}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Citizenship
          </label>
          <input
            type="file"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2 z-10">
          <label className="font-semibold" htmlFor="">
            You are Currently in
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
              >
                {value
                  ? Districts.find((district) => district === value)
                  : "Select Nationality..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search Nationality..." />
                <CommandList>
                  <CommandEmpty>No District found.</CommandEmpty>
                  <CommandGroup>
                    {Districts.map((nationality, i) => (
                      <CommandItem
                        key={i}
                        value={nationality}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === nationality ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {nationality}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full flex gap-2">
          <checkbox id="certified" />
          <input
            type="checkbox"
            onChange={(e) => setCertifiedGuide(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="">
            I am certified Guide
          </label>
          <Checkbox id="certified" />
        </div>
        {certifiedGuide && (
          <>
            <div className="w-full flex flex-col gap-2 z-50">
              <label className="font-semibold" htmlFor="">
                Languages You Speak
              </label>
              <Select
                closeMenuOnSelect={false}
                onChange={handleLanguageChange}
                components={animatedComponents}
                defaultValue={"null"}
                isMulti
                //@ts-ignore
                options={options}
              />
            </div>

            <div className="w-full flex flex-col gap-2 z-10">
              <label className="font-semibold" htmlFor="">
                Places You Know Well
              </label>
              <Select
                closeMenuOnSelect={false}
                onChange={handlePlaceChange}
                components={animatedComponents}
                defaultValue={"null"}
                isMulti
                options={districts}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold" htmlFor="">
                certificate
              </label>
              <input
                type="file"
                className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
                disabled={loading}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold" htmlFor="">
                Your Expected fee(per Hour)
              </label>
              <input
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                type="number"
                className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
                disabled={loading}
              />
            </div>
          </>
        )}

        <Button type="button" onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default GuideForm;
