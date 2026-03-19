import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSubscriptionList } from "../api/subscriptionApi.ts";
import { Subscription } from "../types/subscription.ts";
import { useAuthStore } from "../store/useAuthStore.ts";
import { insertSubscription, updateSubscription, insertSubscriptionData, deleteSubscription } from "../api/subscriptionApi.ts";
import toast from "react-hot-toast";

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

export const useSubscriptionMutation = () => {
    const queryClient = useQueryClient();
    const { session } = useAuthStore();
    const userId = session?.user?.id;

    const addMutation = useMutation({
        mutationFn: (newData: insertSubscriptionData) => insertSubscription(newData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] });
            toast.success("구독 정보가 성공적으로 추가되었습니다.");
        },
        onError: (error: Error) => {
            toast.error(error.message || '구독 추가에 실패했습니다.');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, updateData }: { id: string, updateData: Partial<insertSubscriptionData> }) => updateSubscription(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] });
            toast.success('수정이 완료되었습니다.');
        },
        onError: (error: Error) => {
            toast.error(error.message || '수정에 실패했습니다.');
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ((id: string) => deleteSubscription(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] });
            toast.success('삭제가 완료되었습니다.');
        },
        onError: (error: Error) => {
            toast.error(error.message || '삭제에 실패했습니다.')
        }
    })



    return {
        addMutation,
        updateMutation,
        deleteMutation,
    };
};