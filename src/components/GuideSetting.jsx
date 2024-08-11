"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Districts from "../../districts.json";
import Languages from "../../Languages.json";
import makeAnimated from "react-select/animated";
import { cn } from '../lib/utils';
import axios from "axios";
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
import Select from 'react-select';
import toast from "react-hot-toast";
import { Switch } from "../components/ui/switch";
import { Check, ChevronsUpDown } from "lucide-react";

const GuideSetting = () => {
  const animatedComponents = makeAnimated();
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [certifiedGuide, setCertifiedGuide] = useState(false);
  const [fee, setFee] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  const options = Languages.map((language) => ({
    value: language,
    label: language,
  }));

  const districts = Districts.map((district) => ({
    value: district,
    label: district,
  }));

  useEffect(() => {
    async function getUserDetails() {
      try {
        const res = await axios.get('/api/getUserDetails/tourist');
        if (res.data.success) {
          const fetchedUser = res.data.user;
          setUser(fetchedUser);
          setName(fetchedUser.name || "");
          setEmail(fetchedUser.email || "");
          setNumber(fetchedUser.contact || "");
          setValue(fetchedUser.nationality || "");
          setSelectedOptions(fetchedUser.languages || []);
          setPlaces(fetchedUser.places || []);
          setFee(fetchedUser.fee || 0);
          setCertifiedGuide(fetchedUser.certifiedGuide || false);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    getUserDetails();
  }, []);

  const handleLanguageChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions.map((o) => o.value));
  };

  const handlePlaceChange = (selectedPlaces) => {
    setPlaces(selectedPlaces.map((place) => place.value));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Submitting...");

    let profileData = new FormData();
    let ctzData = new FormData();
    let certData = new FormData();

    const profileInput = document.getElementById('profile');
    const citizenshipInput = document.getElementById('citizenship');
    const certificateInput = document.getElementById('certificate');

    const profileImage = profileInput ? profileInput.files[0] : null;
    const citizenshipImage = citizenshipInput ? citizenshipInput.files[0] : null;
    const certificateImage = certificateInput ? certificateInput.files[0] : null;

    const filename = `${name.replace(" ", "_")}_${Math.floor(Math.random() * (999999 - 100 + 1)) + 100}`;
    const ctzName = `citizenship_${name.replace(" ", "_")}_${Math.floor(Math.random() * (999999 - 100 + 1)) + 100}`;
    const certName = `certificate_${name.replace(" ", "_")}_${Math.floor(Math.random() * (999999 - 100 + 1)) + 100}`;

    if (profileImage) profileData.append("file", profileImage);
    if (citizenshipImage) ctzData.append("file", citizenshipImage);
    if (certificateImage) certData.append("file", certificateImage);

    try {
      const res = await axios.post('/api/guidesignup', {
        name,
        email,
        password: currentPassword,
        newPassword,
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

        if (profileRes.ok && ctzRes.ok && certRes.ok) {
          toast.success("Signed up successfully", { id: toastId });
          setTimeout(() => {
            router.push('/user/login');
          }, 3000);
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
      setName("");
      setEmail("");
      setNumber("");
      setSelectedOptions([]);
      setFee(0);
      setValue("");
      setPlaces([]);
      setCurrentPassword("");
      setNewPassword("");
      setCertifiedGuide(false);
      document.getElementById('profile').value = '';
      document.getElementById('citizenship').value = '';
      if (certifiedGuide) document.getElementById('certificate').value = '';
    }
  };

  return (
    <div className="w-full mx-auto p-4 h-auto min-h-screen flex flex-col justify-center sm:w-2/3 md:w-3/6 lg:w-2/6">
      <h2 className="font-bold text-2xl">Guide Settings!</h2>
      <h4 className="text-md">Guide</h4>

      <form className="bg-white w-auto p-4 rounded-lg mt-5 flex flex-col gap-y-5 gap-x-4">
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold">Available for Booking</label>
          <Switch checked={certifiedGuide} onCheckedChange={setCertifiedGuide} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold">Current Password</label>
          <input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold">New Password</label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold">Profile Picture</label>
          <input
            id="profile"
            type="file"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold">Contact Number</label>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2 z-10">
          <label className="font-semibold">You are Currently in</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
              >
                {value ? Districts.find((district) => district === value) : "Select Nationality..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search Nationality..." />
                <CommandList>
                  <CommandEmpty>No District found.</CommandEmpty>
                  <CommandGroup>
                    {Districts.map((district, i) => (
                      <CommandItem
                        key={i}
                        value={district}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === district ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {district}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full flex flex-col gap-2 z-50">
          <label className="font-semibold">Languages You Speak</label>
          <Select
            closeMenuOnSelect={false}
            onChange={handleLanguageChange}
            components={animatedComponents}
            defaultValue={[]}
            isMulti
            options={options}
          />
        </div>
        <div className="w-full flex flex-col gap-2 z-10">
          <label className="font-semibold">Places You Know Well</label>
          <Select
            closeMenuOnSelect={false}
            onChange={handlePlaceChange}
            components={animatedComponents}
            defaultValue={[]}
            isMulti
            options={districts}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold">Your Expected Fee (per Hour)</label>
          <input
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            type="number"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <Button type="button" onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default GuideSetting;
