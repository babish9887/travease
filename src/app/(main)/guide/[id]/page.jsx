"use client"
import { Button } from '@/components/ui/button';
import { Facebook, Linkedin, Instagram, icons } from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation'
import {useRouter} from 'next/navigation'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

const iconStyle='w-6 h-6 hover:text-orange-500 hover:scale-110 transition-all '
function page() {
      const pathname = usePathname();
      const pathSegments = pathname.split('/');
  const id = pathSegments[pathSegments.length - 1]; // Get the last segment
  return (
      <>
      <div className='w-full  h-[calc(100vh-6rem)] flex justify-center items-center md:px-24 md:py-16 bg-slate-50 '>
            <div className=" relative w-full h-full bg-gray-200 rounded-2xl shadow-xl flex justify-center items-center overflow-hidden">
                  <div className="w-2/5 h-full bg-gray-200">
                        <Image src='https://i.pravatar.cc/34545' className='w-full h-full' width={400} height={400}/>
                  </div>
                  <div className="w-3/5 h-full bg-gray-300 flex justify-center items-center px-12 py-16">
                        <div className='w-full h-full gap-3' >
                              <h1 className='text-5xl font-bold mb-4'>Babish Chaudhary</h1>
                              <p className='text-xl font-light'>Currently In: Kathmandu</p>
                              <p className='text-xl font-light'>ContactNo: +9779098786576</p>
                              <p className='text-xl font-light'></p>

                              <p className='text-xl font-light'>Languages Known: Nepali, English, Hindi</p>
                              <p className='text-xl font-light '>Speciality:  Adventure, Nature, City</p>
                              <p className="mb-4 font-semibold text-base">Price: $123 per Day</p>
                              <p>Know More about guide</p>
                              <div className='flex gap-4 mb-4'>
                                    <FaFacebook className={iconStyle} />
                                    <FaInstagram className={iconStyle}/>
                                    <FaLinkedin className={iconStyle}/>

                                    
                              </div>

                              <Button>Book Guide</Button>
                        </div>
                  </div>

            </div>
            
      </div>
      </>
  )
}

export default page