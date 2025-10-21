import * as FileSystem from "expo-file-system";
import { supabase } from "../lib/supabase";
import { decode } from "base64-arraybuffer";

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

export const uploadFile = async (folderName: string, fileUrl:string) => {
    try{

        let IsImage = true;
        //get folder extionsion from fileUrl
        let folderExtension = fileUrl.split(".").pop();
        
        //Check if folderExtension is image or video
        if(folderExtension === "png" || folderExtension === "jpg" || folderExtension === "jpeg"){
            IsImage = true;
        }
        else if (folderExtension === "mp4"){
            IsImage = false;
        }
        else{
            return {success: false, msg: "Invalid file type"};
        }

        let fileName = getFilePath(folderName, folderExtension);

        const fileBase64 = await FileSystem.readAsStringAsync(fileUrl, 
            { encoding: FileSystem.EncodingType.Base64 });

        
        let imageData = decode(fileBase64);

        const { data, error } = await supabase
        .storage.from("uploads").upload(fileName, imageData, {
            cacheControl: "3600",
            upsert: true,
            contentType: IsImage ? "image/*" : "video/*",
        });

        if(error){
            return {success: false, msg: "Could not upload file"};
        }

        
        return {success: true, msg: "File uploaded successfully", data: data.path};

    }
    catch(error){   
        console.log("error", error);
        return {success: false, msg: "Could not upload file"};
    }
};

export const getFilePath = (folderName: string, folderExtension: string) => {
    return `${folderName}/${(new Date().getTime())}.${folderExtension.toLowerCase()}`;
}