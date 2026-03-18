import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptionList } from "../api/subscriptionApi.tsx";
import { Subscription } from "../types/subscription.tsx";
import { useAuthStore } from "../store/useAuthStore.tsx";


export const useSubscriptions = (sortBy : 'price' | 'created_at' = 'created_at') => {

    const { session } = useAuthStore();
    const userId = session?.user?.id;

    const queryData = useQuery<Subscription[], Error>({
        queryKey: ['subscriptions', userId,sortBy],
        queryFn: () => fetchSubscriptionList(userId,sortBy),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5 //5분
    })

    return {
        ...queryData,
        data : queryData.data ?? [],
    }

}

