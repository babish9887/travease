"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import guidesList from "../../guide.json";
import touristList from "../../tourist.json";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = () => {
    const router = useRouter();
    const [loading, setIsLoading] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    
    // Input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
      let toastId=""
    const handleSubmit = async () => {
      toastId=toast.loading('Logging In')
     setIsLoading(true);
     try{
            await axios.post('/api/login',{email, password})
            .then((res)=>{
                  if(res.data.success==true){
                        toast.success('User Login Successful',{id:toastId})
                        setTimeout(()=>{
                              router.push('/')
                        },3000)
                  } else
                        toast.error('InCorrect Credentials',{id:toastId})
                  console.log(res)
            }).catch((e)=>{
                  console.log(e)
                  toast.error(e.message,{id:toastId})

            })
     } catch (e){
      console.log(e)
     } finally{
      setIsLoading(false)
     }
    };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      if (!resetPassword) {
        const res = await fetch("http://localhost:3000/api/forgotpassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        if (res.ok) {
          toast.success("Check Your Email");
        } else {
          toast.error("Enter Valid Email Address!");
        }
      } else {
        const urlToken = window.location.search.split("=")[1];
        if (!urlToken) {
          setResetPassword(false);
        }
        if (password !== confirmPassword)
          return toast.error("Password Doen't Match");
        const token = decodeURIComponent(urlToken);
        const res = await fetch("http://localhost:3000/api/resetpassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password }),
        });
        if (res.ok) {
          toast.success("Password reset successful");

          setResetPassword(false);
          setTimeout(() => {
            router.replace("/user/login");
          }, 5000);
        } else {
          toast.error("Something went wrong!");
        }
      }
    } catch (e) {
      toast.error(e.message || "An unknown error occurred.");
      console.log(e);
    } finally {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      setResetPassword(false);
    }
  };

  const handleRedirect = () => {
    setResetPassword(false);
    router.replace("/user/login");
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken?.length > 20) {
      setResetPassword(true);
    } else {
      console.log("nothing");
      setResetPassword(false);
    }
  }, [resetPassword, router]);

  return (
    <div className="w-full mt-12 mx-auto p-4 h-[calc(100vh-5rem)] flex flex-col sm:w-2/3 md:w-3/6 lg:w-2/6">
      <h2 className="font-bold text-3xl text-center">
        {!resetPassword ? "Login your Account" : "Reset Your Password"}
      </h2>
      {!resetPassword ? (
        <form className="bg-white p-4 rounded-lg mt-5 flex flex-col gap-y-5">
          <div className="w-full flex flex-col gap-2">
            <label className="font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300 font-medium text-gray-600"
              disabled={loading}
              placeholder="Example@gmail.com"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300 font-medium text-gray-600"
              disabled={loading}
            />
          </div>
          <a
            className="text-left text-sm font-medium text-gray-600 underline hover:text-orange/80 hover:cursor-pointer"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </a>
          <Button
            type="button"
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000/" })
            }
            disabled={loading}
            variant="outline"
            className="text-base"
          >
            Continue with Google
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange text-base hover:bg-orange/90"
          >
            Submit
          </Button>
        </form>
      ) : (
        <form className="bg-white p-4 rounded-lg mt-5 flex flex-col gap-y-5">
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold">New Password</label>
            <input
              value={password} // Use password instead of email
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
              disabled={loading}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold">Confirm Password</label>
            <input
              value={confirmPassword} // Use confirmPassword instead of email
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
              disabled={loading}
            />
          </div>
          <button
            className="text-center text-sm underline hover:text-green-600 hover:cursor-pointer"
            onClick={() => handleRedirect}
          >
            Go to Login Page
          </button>
          <Button
            type="button"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
