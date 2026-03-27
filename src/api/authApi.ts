import { supabase } from "../lib/supabase.ts";

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider : 'google',
        options : {
            redirectTo : window.location.origin + '/dashboard',
            queryParams : {
                access_type : 'offline',
                prompt : 'consent',
            }
        }
    })

    if(error) throw error;

    return data
}

export const signinWithKaKao = async () => {
    const { data,error } = await supabase.auth.signInWithOAuth({
        provider : 'kakao',
        options : { 
            redirectTo : "https://www.gudokping.com/dashBoard",
        }
    });

    if(error) throw error
    
};

//'https://www.gudokping.com/dashBoard'