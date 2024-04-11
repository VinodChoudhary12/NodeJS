import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from 'fs'


cloudinary.config({
    cloud_name: process.env.CLOUDINORY_CLOUD_NAME,
    api_key: process.env.CLOUDINORY_API_KEY,
    api_secret: process.env.CLOUDINORY_API_SECRET
});

export const uploadOnCloudinory = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload file in cloudinory
        // cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
        //     { public_id: "olympic_flag" },
        //     function (error, result) { console.log(result); });

        const cloudResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'  //in this all type of data can insert
            // resource_type:'video' //n this only video can upload
        })
        //file uploaded successfully
        console.log('File is uploaded in cloudanary');
        console.log(cloudResponse);
        console.log(cloudResponse.url); //this is give url
        return cloudResponse;


    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the localy saved temporary file as the upload
        //opration got failed
        return null;

    }
}


