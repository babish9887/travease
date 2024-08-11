// pages/api/add-guide.js
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

// Define the path to the JSON file
const filePath = path.join(process.cwd(), '/bookings.json');

export async function POST(req) {
    try {
        const { userId,guideId, startDate, endDate} = await req.json();
      console.log(guideId, startDate, endDate)
     
        // Read existing data
        const data = await fs.readFile(filePath, 'utf8');
        let booking;

        try {
            booking = JSON.parse(data);
        } catch (parseErr) {
            console.error('Failed to parse JSON:', parseErr);
            return NextResponse.json({ success: false, message: 'Failed to parse existing data' }, { status: 500 });
        }
      //   const oldUser=touristList.find((guide)=>{guide.email==email})

        // Add the new guide
        let lastId=booking[booking.length-1].id;
        const newBooking={
            id:lastId+1,
            userId,
            guideId, 
            startDate:startDate.toString(),
            endDate:endDate.toString()
      }

        booking.push(newBooking);

        // Write updated data back to the file
        await fs.writeFile(filePath, JSON.stringify(booking, null, 2), 'utf8');

        return NextResponse.json({ success: true, message: 'Guide Booked successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error in add-guide API:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
