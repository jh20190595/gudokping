import { useMemo } from "react";
import { useSubscriptions } from "./useSubscriptions.tsx";
import { SUBSCRIPTION_SERVICES } from "../constants/subscriptionData.tsx";

export const useSubscriptionSummary = () => {

    const { data: subscriptions, isLoading, isError } = useSubscriptions('created_at');

    const summary = useMemo(() => {
        if (!subscriptions || subscriptions.length === 0) {
            return {
                totalMonthlycost: 0,
                activeService: 0,
                MaxPriceService: null,
                MaxPriceserviceLogo: "",
                annualTotalCost: 0,
            }
        }

        const totalMonthlycost = subscriptions.reduce((acc, item) => {
            const monthlyPrice = item.billing_cycle === 'yearly' ? item.price / 12 : item.price;
            return acc + monthlyPrice; //년단위 일경우 금액을 12로 나눈다
        }, 0);

        const currentYear = new Date().getFullYear();

        const annualTotalCost = subscriptions.reduce((acc, item) => {
            if (item.billing_cycle === 'monthly') {
                const startDate = new Date(item.start_date);
                const startYear = startDate.getFullYear(); // 월구독인 경우 구독 시작한 년도 구하고

                if (startYear === currentYear) { // 구독 시작한 년도 === 현재 년도 같으면
                    const startMonth = startDate.getMonth() + 1; 
                    const monthsActiveThisYear = 12 - startMonth + 1; // 구독 시작한 달 구한뒤 12개월에서 빼기
                    return acc + (item.price * monthsActiveThisYear);

                } else if (startYear < currentYear) { // 작년에 구독했을경우 바로 곱하기 12
                    return acc + (item.price * 12);
                }
            } else { // 구독 사이클이 년단위 일 경우
                const nextBillingYear = new Date(item.next_billing_date).getFullYear();
                if (nextBillingYear === currentYear) {
                    return acc + item.price;
                }
            }

            return acc;
        }, 0);

        const activeService = subscriptions.length;

        const MaxPriceService = subscriptions.reduce((prev, current) => {
            const prevMonthly = prev.billing_cycle === 'yearly' ? prev.price / 12 : prev.price;
            const currentMonthly = current.billing_cycle === 'yearly' ? current.price / 12 : current.price;

            return (prevMonthly > currentMonthly) ? prev : current;
        });

        const MaxPriceserviceLogo = SUBSCRIPTION_SERVICES.find(
            f => f.service_name === MaxPriceService.service_name
        )?.logoUrl;

        return {
            totalMonthlycost,
            activeService,
            MaxPriceService,
            MaxPriceserviceLogo,
            annualTotalCost,
        }
    }, [subscriptions]);

    return { summary, isLoading, isError }
};