import { useMemo } from "react";
import { useSubscriptions } from "./useSubscriptions.tsx";
import { SUBSCRIPTION_SERVICES } from "../constants/subscriptionData.tsx";

export const useSubscriptionSummary = () => {
    
    const { data : subscriptions , isLoading , isError} = useSubscriptions('created_at');


    const summary = useMemo(() => {
        if (!subscriptions || subscriptions.length === 0) {
            return {
                totalMonthlycost: 0,
                activeService : 0,
                MaxPriceService : null,
                MaxPriceserviceLogo : "",
                annualTotalCost : 0,
            }
        }
        const totalMonthlycost = subscriptions.reduce((acc, item) => { return acc += item.price }, 0)

        const activeService = subscriptions.length

        const MaxPriceService = subscriptions.reduce((prev,current) => {
            return (prev.price > current.price) ? prev : current;
        })

        const MaxPriceserviceLogo = SUBSCRIPTION_SERVICES.find( f => f.service_name === MaxPriceService.service_name)?.logoUrl

        const annualTotalCost = subscriptions.reduce((acc,item) => {
            const month = new Date(item.start_date).getMonth() + 1
            const price = (12 - month) * item.price

            return acc += price;
        },0)


        return {
            totalMonthlycost,
            activeService,
            MaxPriceService,
            MaxPriceserviceLogo,
            annualTotalCost,
        }
    }, [subscriptions])

    return { summary, isLoading, isError}
};