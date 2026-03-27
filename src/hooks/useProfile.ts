import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmailEnabled, fetchEmailEnabled,deleteUser } from "../api/profileApi.ts"
import { useAuthStore } from "../store/useAuthStore.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.ts";

export const useProfileSettings = () => {
    const session = useAuthStore((state) => state.session);
    const userId = session?.user?.id;

    return useQuery({
        queryKey: ['profiles', userId],
        queryFn: () => fetchEmailEnabled(userId),
        enabled: !!userId,
        staleTime : 1000 * 60 * 5,
        gcTime : 1000 * 60 * 10,
    });
} 


export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const session = useAuthStore((state) => state.session);
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

export const useDeleteUser = () => {
    const setSession = useAuthStore((state) => state.setSession);
    const navigate = useNavigate();

    return useMutation({
        mutationFn : deleteUser,
        onSuccess : async () => {
            await supabase.auth.signOut();
            setSession(null);
            toast.success('회원 탈퇴가 완료되었습니다.');
            navigate('/')
        },
        onError : (error : Error) => {
            toast.error('탈퇴 실패:' + error.message);
        }
    })

} 