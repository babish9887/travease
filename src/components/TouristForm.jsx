
"use client";
import React, {  useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Nationalities from "../../Nationalities.json";
import Districts from "../../districts.json";


import { Check, ChevronsUpDown } from "lucide-react";
import Languages from "../../Languages.json";
import makeAnimated from "react-select/animated";
import {cn} from '../lib/utils'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

import Select from 'react-select'
import { Checkbox } from "@radix-ui/react-checkbox";

const GuideForm = () => {
// const [session, setSession]=useState(undefined)
  const animatedComponents = makeAnimated();
  const [number, setNumber] = useState("");
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [position, setPosition]=useState({
      lat:0,
      lng:0
  })

  const [name, setName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [certifiedGuide, setCertifiedGuide]=useState(false)
  

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleLanguageChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions.map((o) => o.value));
  };
  const options = Languages.map((language) => ({
    value: language,
    label: language,
  }));

  const districts = Districts.map((language) => ({
      value: language,
      label: language,
    }));

  const handleSubmit = async () => {
    
  };

  return (
    <div className="w-full mx-auto p-4  h-auto min-h-screen flex flex-col justify-center sm:w-2/3 md:w-3/6 lg:w-2/6">
      <h2 className=" font-bold text-2xl">Register your account!</h2>
      <h4 className="  text-md">As a Tourist</h4>

      <form className="bg-white w-auto p-4 rounded-lg mt-5 flex flex-col gap-y-5 gap-x-4">
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

        <div className="w-full flex flex-col gap-2 z-10">
          <label className="font-semibold" htmlFor="">
            Nationality
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
                  ? Nationalities.find((nationality) => nationality === value)
                  : "Select Nationality..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search Nationality..." />
                <CommandList>
                  <CommandEmpty>No Nationality found.</CommandEmpty>
                  <CommandGroup>
                    {Nationalities.map((nationality, i) => (
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

        <Button type="button" onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default GuideForm;
