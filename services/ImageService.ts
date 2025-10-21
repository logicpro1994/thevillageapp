import * as FileSystem from "expo-file-system";
import { supabase } from "../lib/supabase";
import { decode } from "base64-arraybuffer";
import { Asset } from 'expo-asset';


export const getUserImageSrc = async (imagePath: string) => {
        
    if (imagePath) {
        // Get the public URL from Supabase storage
        const { data } = supabase
            .storage
            .from("uploads")
            .getPublicUrl(imagePath);
        
        if (data?.publicUrl) {
            return data.publicUrl;
        } else {
            return require("../assets/images/defaultUser.png");
        }
    }
    else
    {
        return require("../assets/images/defaultUser.png");
    }
};

export const uploadFile = async (folderName: string, fileUrl: string) => {
    try {
        let IsImage = true;
        let fileName = "";
        let actualFileUri = fileUrl;

        if (fileUrl !== "") {
            // Get file extension from fileUrl
            let fileExtension = fileUrl.split(".").pop()?.toLowerCase();
            
            // Check if fileExtension is image or video
            if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg") {
                IsImage = true;
            } else if (fileExtension === "mp4") {
                IsImage = false;
            } else {
                return { success: false, msg: "Invalid file type" };
            }

            fileName = getFilePath(folderName, fileExtension);
        } else {
            // Handle default image from assets
            const asset = Asset.fromModule(require("../assets/images/defaultUser.png"));
            await asset.downloadAsync();
            
            actualFileUri = asset.localUri || asset.uri;
            fileName = getFilePath(folderName, "png");
            IsImage = true;
        }

        // Read file as base64
        const fileBase64 = await FileSystem.readAsStringAsync(actualFileUri, {
            encoding: FileSystem.EncodingType.Base64
        });

        // Decode base64 to ArrayBuffer
        let imageData = decode(fileBase64);

        // Upload to Supabase
        const { data, error } = await supabase.storage
            .from("uploads")
            .upload(fileName, imageData, {
                cacheControl: "3600",
                upsert: true,
                contentType: IsImage ? "image/*" : "video/*",
            });

        if (error) {
            console.log("Upload error:", error);
            return { success: false, msg: "Could not upload file" };
        }

        return { success: true, msg: "File uploaded successfully", data: data.path };

    } catch (error) {
        console.log("error", error);
        return { success: false, msg: "Could not upload file" };
    }
};

export const getFilePath = (folderName: string, folderExtension: string) => {
    return `${folderName}/${(new Date().getTime())}.${folderExtension.toLowerCase()}`;
}