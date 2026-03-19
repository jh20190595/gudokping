import { create } from "zustand";

interface ThemeState {
    isDark : boolean;
    setIsDark : (isDark:boolean) => void;
}


export const useThemeStore = create<ThemeState>((set) => ({
    isDark : localStorage.getItem('theme') === 'dark',
    setIsDark : (newIsDark) => set({isDark : newIsDark})
}))