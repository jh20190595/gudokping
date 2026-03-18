import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertSubscription, updateSubscription, insertSubscriptionData, deleteSubscription } from "../api/subscriptionApi.tsx";
import { updateEmailEnabled } from "../api/profileApi.tsx";
import { useAuthStore } from "../store/useAuthStore.tsx";
import toast from "react-hot-toast";

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