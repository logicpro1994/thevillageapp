import { supabase } from "../lib/supabase";

export const getUserData = async (userId: string) => {
    //console.log("getting user data for user id", userId);
    try
    {
        const { data, error } = await supabase
        .from("users").select("*").eq("id", userId).single();
        
        //console.log("user data", data);
                
        return data;
    } catch (error) {
        console.log("error", error);
        console.error("Error getting user data", error);
        throw error;
    }
};


export const updateUserData = async (userId: string, userData: any)
    : Promise<{success: boolean, msg: string | null}> => {
    try {
        const { error } = await supabase
        .from("users")
        .update(userData)
        .eq("id", userId);

        if (error) {
            return {success: false, msg: error?.message};
        }

        return {success: true, msg: userData};
    } catch (error) {
        console.log("error", error);
        console.error("Error updating user data", error);
        throw error;
    }
};  