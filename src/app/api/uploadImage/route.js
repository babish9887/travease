import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {

      const {query:{id}, method}=req;
      console.log(id)
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({success:false, error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename =  file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "/public/" + filename),
      buffer
    );
    return NextResponse.json({success:true, Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({success:false, Message: "Failed", status: 500 });
  }
};
