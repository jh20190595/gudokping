import { create } from "zustand";
import { Session } from '@supabase/supabase-js';

interface AuthStore {
    session : Session | null;
    isAuthLoading : boolean;
    setSession : (session : Session | null) => void;
    setAuthLoading : (loading : boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    session : null,
    isAuthLoading : true,
    setSession : (session) => set({session}),
    setAuthLoading : (isAuthLoading) => set({isAuthLoading}),
}))