import { SupabaseClient } from '@supabase/supabase-js'
import { Subscription } from '../types/subscription.tsx'
import { supabase } from '../lib/supabase.ts'
import axios from 'axios'
import toast from 'react-hot-toast'

export const fetchSubscriptionList = async (userId: string | undefined , sortBy : 'price' | 'created_at' = 'created_at') => {

    if(!userId) return [];

    try {
        const { data, error } = await supabase
            .from('subscription')
            .select('*')
            .eq('user_id',userId)
            .order(sortBy, { ascending: false })
        if (error) throw error;
        return data;
    } catch (error: any) {
        if (error.name === 'AbortError' || error.message?.includes('aborted')) {
            return []
        }

        throw error;
    }

}

export type insertSubscriptionData = Omit<Subscription, 'id' | 'created_at'>

export const insertSubscription = async (form : insertSubscriptionData) => {

    const newData = {
        service_name : form.service_name,
        plan_name : form.plan_name,
        price : form.price,
        category : form.category,
        start_date : form.start_date,
        memo : form.memo,
        next_billing_date : form.next_billing_date,
        payment_type : form.payment_type,
        payment_name : form.payment_name,
    }

    const { data, error } = await supabase
        .from('subscription')
        .insert([newData])
        .select()
        .single();
    
    if (error) {
        console.error('데이터 추가 중 에러 발생 : ', error.message);
        throw error;
    }

    return data
}

export const updateSubscription = async (id : string, updateData : Partial<insertSubscriptionData>) => {
    if(!id) throw new Error("id가 없습니다.");

    const { data, error} = await supabase
        .from('subscription')
        .update(updateData)
        .eq('id',id)
        .select()
        .maybeSingle();

    if (error) {
        console.error('업데이트 중 에러 발생 : ', error.message)
        throw error;
    }

    return data;

}

export const deleteSubscription = async (id:string) => {
    if(!id) throw new Error("id가 없습니다.")

    const { data, error } = await supabase
        .from('subscription')
        .delete()
        .eq('id',id) //equal 동등한 , 조건문
        .select() // 삭제된 행의 데이터를 결과값으로 반환하라고 요청. 원하는 정보가 삭제된지 확인
        .single(); //삭제된 결과가 단 하나일 것이라고 확신할 때 사용 
                  //배열형태가 아니라 객체형태로 데이터를 깔끔하게 받기위해 사용

    if(error) {
        toast.error('삭제에 실패했습니다.');
        return;
    }
}
