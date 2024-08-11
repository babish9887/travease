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

import Select from 'react-select'
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

  const [name, setName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [certifiedGuide, setCertifiedGuide]=useState(false)

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
      toastId = toast.loading("Signing Up");
    
      let profileData = new FormData();
      let ctzData = new FormData();
      let certData = new FormData();
    
      // Get file input elements
      const profileInput = document.getElementById('profile');
      const citizenshipInput = document.getElementById('citizenship');
      const certificateInput = document.getElementById('certificate');
    
      // Check if inputs are not null and get the files
      const profileImage = profileInput ? profileInput.files[0] : null;
      const citizenshipImage = citizenshipInput ? citizenshipInput.files[0] : null;
      const certificateImage = certificateInput ? certificateInput.files[0] : null;
    
      // Generate filenames
      const filename = `${name.replace(" ", "_")}_${Math.floor(Math.random() * (999999 - 100 + 1)) + 100}`;
      const ctzName = `citizenship_${name.replace(" ", "_")}_${Math.floor(Math.random() * (999999 - 100 + 1)) + 100}`;
      const certName = `certificate_${name.replace(" ", "_")}_${Math.floor(Math.random() * (999999 - 100 + 1)) + 100}`;
    
      // Append files to FormData objects
      if (profileImage) profileData.append("file", profileImage);
      if (citizenshipImage) ctzData.append("file", citizenshipImage);
      if (certificateImage) certData.append("file", certificateImage);
    
      try {
        // Send data to backend
        const res = await axios.post('/api/guidesignup', {
          name,
          email,
          password,
          number,
          currently_in: value,
          language: selectedOptions,
          places,
          fee,
          image: filename,
          citizenship_card: ctzName,
          guide_certificate: certifiedGuide ? certName : "" 
        });
    
        if (res.data.success) {
          const profileRes = await fetch(`/api/uploadImage/${filename}`, {
            method: "POST",
            body: profileData,
          });
    
          const ctzRes = citizenshipImage ? await fetch(`/api/uploadImage/${ctzName}`, {
            method: "POST",
            body: ctzData,
          }) : { ok: true };
    
          const certRes = certificateImage ? await fetch(`/api/uploadImage/${certName}`, {
            method: "POST",
            body: certData,
          }) : { ok: true };
    
          if (profileRes.ok && ctzRes.ok || certRes.ok) {
            toast.success("Signed up successfully", { id: toastId });
            setTimeout(()=>{
                  router.push('/user/login')
            },3000)
          } else {
            toast.error("Failed to upload files", { id: toastId });
          }
        } else {
          toast.error("Failed to sign up", { id: toastId });
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred", { id: toastId });
      } finally {
        setIsLoading(false);
        setName("")
        setEmail("")
        setNumber("")
       setSelectedOptions([])
       setFee(0)
       setValue("")
       setPlaces([])
       setPassword("")
      
       
       document.getElementById('profile').value='';
       document.getElementById('citizenship').value='';
       if(certifiedGuide)
            document.getElementById('certificate').value='';

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
          id="citizenship"
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
          <input
            type="checkbox"
            onChange={(e) => setCertifiedGuide(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="">
            I am certified Guide
          </label>
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
                id='certificate'
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
