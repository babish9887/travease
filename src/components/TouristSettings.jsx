"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const TouristSettings = () => {
  // Initialize state
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [number, setNumber] = useState("");
  const [value, setValue] = useState(""); // Assuming this is for nationality or similar
  const [loading, setIsLoading] = useState(false);

  // Fetch user details on component mount
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
          setValue(fetchedUser.nationality || ""); // Adjust based on your API response
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    getUserDetails();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Signing Up");

    const image = document.getElementById('pp').files[0]; // Get the selected file
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('currentPassword', currentPassword);
    formData.append('newPassword', newPassword);
    formData.append('number', number);
    formData.append('nationality', value);
    if (image) formData.append('profilePicture', image);

    try {
      const res = await axios.post('/api/touristsignup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.success) {
        toast.success("Signed up successfully", { id: toastId });
      } else {
        toast.error("Failed", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", { id: toastId });
    } finally {
      setIsLoading(false);
      // Reset state after submission if needed
      setName("");
      setEmail("");
      setCurrentPassword("");
      setNewPassword("");
      setNumber("");
      setValue("");
      document.getElementById('pp').value = '';
    }
  };

  return (
    <div className="w-full mx-auto p-4 h-auto min-h-screen flex flex-col justify-center sm:w-2/3 md:w-3/6 lg:w-2/6">
      <h2 className="font-bold text-2xl">User Settings</h2>
      <h4 className="text-md">Tourist</h4>

      <form className="bg-white w-auto p-4 rounded-lg mt-5 flex flex-col gap-y-5 gap-x-4">
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="number">
            Contact Number
          </label>
          <input
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="newPassword">
            New Password
          </label>
          <input
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>
    
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="pp">
            Profile Picture
          </label>
          <input
            id="pp"
            type="file"
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

export default TouristSettings;
