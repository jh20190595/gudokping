import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmailEnabled, fetchEmailEnabled } from "../api/profileApi.tsx"
import { useAuthStore } from "../store/useAuthStore.tsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useProfileSettings = () => {
    const { session } = useAuthStore();
    const userId = session?.user?.id;

    return useQuery({
        queryKey: ['profiles', userId],
        queryFn: () => fetchEmailEnabled(userId),
        enabled: !!userId,
        staleTime : 1000 * 60 * 5,
    });
} 


export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { session } = useAuthStore();
    const userId = session?.user?.id;

    return useMutation({
        mutationFn: ({ id, emailEnabled }: { id: string, emailEnabled: boolean }) => updateEmailEnabled(id, emailEnabled),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['profiles', userId] });
            
            if (variables.emailEnabled) {
                toast.success('알림이 켜졌습니다. 🔔');
            } else {
                toast.success('알림이 꺼졌습니다. 🔕');
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || '알림 수정에 실패하였습니다.');
        }
    });
}
