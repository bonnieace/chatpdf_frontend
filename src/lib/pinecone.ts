import { downloadFromS3 } from "./s3-server";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";



import FormData from 'form-data';
import { basename } from "path";




export async function loadS3IntoPinecone(fileKey: string) {
  try {
    // Extract the file name from the file key
    const fileName = basename(fileKey);

    // 1. Obtain the PDF: download and read from S3
    console.log("Downloading S3 file content for:", fileName);
    const fileContent = await downloadFromS3(fileKey);

    if (!fileContent) {
      throw new Error("Could not download S3 file content");
    }
    const url =`https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileKey}`
  
    console.log(url)
    
    // 2. Create FormData and send the PDF content to the server
    
  } catch (error) {
    console.log(error);
    throw error;
  }
  
}