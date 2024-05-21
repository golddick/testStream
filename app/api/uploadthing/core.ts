import { getLoginUser } from "@/lib/auth-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { connectToDatabase } from "@/lib/database"; 
import StreamData from "@/lib/database/models/streamData.models";
import { metadata } from "@/app/layout";


const f = createUploadthing();
 

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  thumbnailUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } 
})

.middleware(async () => {
    const self = await getLoginUser()

    return {user:self}
})


.onUploadComplete(async ({ metadata, file }) => {
    await connectToDatabase();

    const validData ={
        thumbnailUrl:file.url ,
    }
    console.log(metadata.user)

     await StreamData.findByIdAndUpdate(metadata.user._id , validData, { new: true });
    return { fileUrl: file.url };
})

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;