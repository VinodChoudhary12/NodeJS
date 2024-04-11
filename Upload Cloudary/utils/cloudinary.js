import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

cloudinary.config({
    cloud_name: "dapys6ybw",
    api_key: "549677616417383",
    api_secret: "OFFob1fPNWDGMl7CIBsZAm0Ko2k",
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const cloudResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File is uploaded to Cloudinary");
        console.log(cloudResponse);
        console.log(cloudResponse.url);
        fs.unlinkSync(localFilePath);

        return cloudResponse;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        fs.unlinkSync(localFilePath);
        return null;
    }
};



