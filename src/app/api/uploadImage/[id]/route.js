import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, context) => {

  const image=context.params.id;
  console.log(image)
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({success:false, error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let folder=""
  if(image.split("_")[0]==="citizenship"){
      folder="citizenship"
  } else if(image.split("_")[0]==="certificate"){
      folder="certificate"
  } else {
      folder="profile_pic"
  }
console.log(image.split("_")[0], folder)
  try {
    await writeFile(
      path.join(process.cwd(), `/public/${folder}/` + image+".png"),
      buffer
    );
    return NextResponse.json({success:true, Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({success:false, Message: "Failed", status: 500 });
  }
};
