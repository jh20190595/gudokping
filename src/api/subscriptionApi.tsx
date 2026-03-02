import { SupabaseClient } from '@supabase/supabase-js'
import { Subscription } from '../types/subscription.tsx'
import { supabase } from '../lib/supabase.ts'
import axios from 'axios'

export const fetchSubscriptionList = async (userId: string | undefined) => {

    if(!userId) return [];

    try {
        const { data, error } = await supabase
            .from('subscription')
            .select('*')
            .eq('user_id',userId)
            .order('created_at', { ascending: true })
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
        .single();

    if (error) {
        console.error('업데이트 중 에러 발생 : ', error.message)
        throw error;
    }

}
