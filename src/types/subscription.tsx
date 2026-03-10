export interface Subscription {
    id : number;
    user_id? : string;
    service_name : string;
    plan_name : string;
    price : number;
    category : string;
    start_date : string;
    memo : string;
    created_at : string;
    dDay : number;
    next_billing_date : string;
    payment_type : string;
    payment_name : string;
    billing_cycle : string;
}