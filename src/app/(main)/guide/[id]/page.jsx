"use client"
import { Button } from '../../../../components/ui/button';
import { Facebook, Linkedin, Instagram, icons } from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation'
import {useRouter} from 'next/navigation'
import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import guidesList from '../../../../../guide.json'
import Link from 'next/link'
import toast from 'react-hot-toast';
import axios from 'axios';
import { setLazyProp } from 'next/dist/server/api-utils';
const iconStyle='w-6 h-6 hover:text-orange-500 hover:scale-110 transition-all '
function page() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const id = pathSegments[pathSegments.length - 1]; // Get the last segment
  console.log(id)

  const guide=guidesList.find((guide)=>guide.id==id)
  console.log(guide)
const imageType=guide.image.substring(0,4)
  const imageUrl=imageType=="http"?guide.image:`/profile_pic/${guide.image}.png`
  console.log(imageUrl)
  const [book , setBook]=useState(false)
  const[loading, isLoading]=useState(false)
  let toastId=""
  const handleBooking = async () => {
        toastId= toast.loading('Booking...');
        const startDateInput = document.getElementById('startDate').value;
      const endDateInput = document.getElementById('endDate').value;
      
      const startDate = new Date(startDateInput);
      const endDate = new Date(endDateInput);
    
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
    
      if (startDate < today) {
        toast.error('Start date cannot be in the past.',{id:toastId});
        return; 
      }
    
      if (endDate < startDate) {
        toast.error('End date must be the same as or later than the start date.',{id:toastId});
        return; 
      }
   try {
      let user= null
      await axios.get("/api/checkcookie").then((res) => {
            console.log(res.data);
            user=res.data.user
            console.log(res.data.user)
          });
          console.log(user)
      await axios.post('/api/booking', {userId:user.id, guideId:guide.id, startDate, endDate})
      .then((res)=>{
        if(res.data.success){
              toast.success("Guide Booked Successfully",{id:toastId})
        } else
               toast.error("Guide Booked Failed",{id:toastId})
  
      })
   } catch (error) {
      toast.error(error.message, {id:toastId})

   } finally{
      isLoading(false)
   }
    
    };
    
    
  return (
      <>
      <div className='w-full  h-auto min-h-[100vh] flex justify-center items-center md:px-24 md:py-16 bg-slate-50 '>
            <div className=" relative w-full h-full bg-gray-200 rounded-2xl shadow-xl flex justify-center items-center overflow-hidden">
                  <div className="w-2/5 h-full bg-gray-200">
                        <Image src={imageUrl} className='w-full h-full' width={400} height={400} alt={guide.name}/>
                        {/* <img src='/profile_pic/babish_840576.png' /> */}
                  </div>
                  <div className="w-3/5 h-fullflex justify-center items-center px-12 py-16">
                        <div className='w-full h-full gap-3' >
                              <h1 className='text-5xl font-bold mb-4'>{guide.name}</h1>
                              <p className='text-xl font-light'>Currently In: {guide.currently_in}</p>
                              <p className='text-xl font-light'>ContactNo: {guide.contact_no}</p>
                              <p className='text-xl font-light'></p>

                              {guide.guice_certificate && <p className='text-xl font-light'>Languages Known: { guide.language.join(", ")}</p>}
                              <p className='text-xl font-light '>Speciality:  Adventure, Nature, City</p>
                              <p className='text-xl font-light '>Places Known Well:  {guide.places.join(", ")}</p>

                              <p className="mb-4">Price: ${guide.fee} per Hour</p>
                              <p>Know More about guide</p>
                             { guide.social_media ? <div className='flex gap-4 mb-4'>
                              {guide.social_media.facebook!=="" && <Link href={guide.social_media.facebook}>
                                    <FaFacebook className={iconStyle} />
                                    </Link>}

                                   {guide.social_media.instagram!=="" && <Link href={guide.social_media.instagram}>
                                    <FaInstagram className={iconStyle} />
                                    </Link>}

                                    {guide.social_media.linkedin!=="" && <Link href={guide.social_media.linkedin}>
                                    <FaLinkedin className={iconStyle} />
                                    </Link>}

                                    
                              </div>: 
                              <p>Nothing to Show</p>}

                              <Button onClick={()=>setBook(!book)}>{book ? "cancel":"Get Booking"}</Button>
                              {book && (
                                    <div>
                                            <div className="w-full flex flex-col gap-2">
                                          <label className="font-semibold">Start Date</label>
                                          <input
                                          id="startDate"
                                          type="date"
                                          className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
                                          disabled={loading}
                                          />
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                          <label className="font-semibold">End Date</label>
                                          <input
                                          id="endDate"
                                          type="date"
                                          className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
                                          disabled={loading}
                                          />
                                    </div>
                                    <Button onClick={handleBooking} className="mt-4">Submit Your booking</Button>
                                    </div>
                              )}
                        </div>
                  </div>

            </div>
            
      </div>
    </>
  );
}

export default page;
