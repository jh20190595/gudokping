import { create, } from "zustand";
import { persist } from "zustand/middleware";

interface ModalState {
    isOpen : boolean;
    openForm : () => void;
    closeForm : () => void;
}



export const useModalStore = create<ModalState>((set) => ({
    isOpen : false,
    openForm : () => set({ isOpen : true}),
    closeForm : () => set({ isOpen : false})
}))