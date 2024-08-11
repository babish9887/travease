// pages/api/add-guide.js
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import touristList from '../../../../tourist.json'

// Define the path to the JSON file
const filePath = path.join(process.cwd(), '/tourist.json');

export async function POST(req) {
    try {
        const {name, image,email, password, number, nationality} = await req.json();
      
        // Read existing data
        const data = await fs.readFile(filePath, 'utf8');
        let guides;

        try {
            guides = JSON.parse(data);
        } catch (parseErr) {
            console.error('Failed to parse JSON:', parseErr);
            return NextResponse.json({ success: false, message: 'Failed to parse existing data' }, { status: 500 });
        }
      //   const oldUser=touristList.find((guide)=>{guide.email==email})
        const oldUser=touristList.filter((tourist)=>tourist.email==email)
        console.log(oldUser)
        if(oldUser.length>0)
            return NextResponse.json({ success: false, message: 'User with this email Already Exists' }, { status: 400 });

        // Add the new guide
        let lastId=guides[guides.length-1].id;
        const guide={
            id:lastId+1,
            name,
            email,
            password, 
            contact_no:number,
            nationality,
            image
      }

        guides.push(guide);

        // Write updated data back to the file
        await fs.writeFile(filePath, JSON.stringify(guides, null, 2), 'utf8');

        return NextResponse.json({ success: true, message: 'Guide added successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error in add-guide API:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
