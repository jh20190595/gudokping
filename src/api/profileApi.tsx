import { supabase } from '../lib/supabase.ts'
import toast from 'react-hot-toast'

export const fetchEmailEnabled = async (userId : string | undefined) => {

    if(!userId) return false;

    const { data , error } = await supabase
        .from('profiles')
        .select('is_email_enabled')
        .eq('id', userId)
        .maybeSingle();

        if(error) {
            console.error('프로필 설정 조회 중 에러 발생 : ', error.message);
            throw error;
        }

        return data?.is_email_enabled ?? false;
}

export const updateEmailEnabled = async (id : string, emailEnabled : boolean) => {
    if(!id) throw new Error('id가 없습니다.');

    const { data , error } = await supabase
        .from('profiles')
        .update({ is_email_enabled : emailEnabled})
        .eq('id', id)
        .select()


        if(error) {
            console.log('수정 중 에러 발생 : ', error.message);
            throw error;
        }

        return data;

}
