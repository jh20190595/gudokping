import { useState,useEffect } from "react";
import { SUBSCRIPTION_SERVICES } from "../constants/subscriptionData.tsx";
import toast from "react-hot-toast";
import { IoFemaleSharp } from "react-icons/io5";

const initial_state = {
    service_name: "",
    plan_name: "",
    price: 0,
    category: "",
    start_date: new Date(),
    next_billing_date: new Date(),
    memo: "",
    payment_type: "카드",
    payment_name: "",
}

export const useSubscriptionLogic = (initialData : any = null) => {

    const [form, setForm] = useState(initial_state);

    useEffect(() => {
        if(initialData) {
            setForm({
                ...initialData,
            })
            console.log( "실행된다~~~~~~~")
        } else {
            setForm(initial_state);
        }
    },[initialData])

    const changeService = (newServiceId: string) => {

        const currentService = SUBSCRIPTION_SERVICES.find(s => s.service_name === newServiceId);

        setForm(prev => ({
            ...prev,
            service_name: newServiceId,
            category: currentService?.category || "",
            plan_name: "",
            price: 0
        }));
    };


    const changePlan = (newPlanId: string) => {

        const currentService = SUBSCRIPTION_SERVICES.find(s => s.service_name === form.service_name);

        const selectedPlan = currentService?.plans.find(p => p.name === newPlanId);

        const newPrice = selectedPlan ? selectedPlan.price : 0;

        setForm(prev => ({
            ...prev,
            plan_name: newPlanId,
            price: newPrice
        }));
    };


    const changePrice = (inputValue: string) => {

        const onlyNumber = inputValue.replace(/[^0-9]/g, '');

        if (onlyNumber.length > 9) {
            return;
        }

        setForm(prev => ({
            ...prev,
            price: Number(onlyNumber)
        }));

    };

    const changeMemo = (inputValue: string) => {

        setForm(prev => ({
            ...prev,
            memo: inputValue,
        }))

    }

    const changeDate = (key: 'start_date' | 'next_billing_date', date: Date) => {
        setForm(prev => ({ ...prev, [key]: date }));
    }

    const changePayment = (value: string) => {
        setForm(prev => ({ ...prev, payment_type: value, payment_name: "" }))
    }

    const changePaymentName = (value: string) => {
        setForm(prev => ({ ...prev, payment_name: value }))
    }


    const currentServiceData = SUBSCRIPTION_SERVICES.find(s => s.service_name === form.service_name);


    const currentPlanOptions = currentServiceData?.plans.map(p => ({
        value: p.name,
        label: `${p.name} (${p.price.toLocaleString()}원)`
    })) || [];

    const reset = () => {
        setForm(initial_state);
    }

    const validateForm = (addData: object) => {
        if (!form.service_name) {
            toast.error("서비스를 선택해주세요.");
            return false
        }
        if (!form.plan_name) {
            toast.error("플랜을 선택해주세요.");
            return false
        }
        if (form.price < 0) {
            toast.error("가격을 다시 확인해주세요.");
            return false
        }
        if (form.start_date >= form.next_billing_date) {
            toast.error("갱신일은 시작일 이후여야 합니다. ");
            return false
        }
        if (!form.payment_type) {
            toast.error("결제 수단을 선택해주세요.");
            return false
        }
        if (!form.payment_name) {
            toast.error("결제 상세수단을 선택해주세요.");
            return false;
        }

        return true;

    }

    return {
        form,
        changeService,
        changePlan,
        changePrice,
        changeMemo,
        changeDate,
        changePayment,
        changePaymentName,
        currentPlanOptions,
        validateForm,
        reset,
    };
};