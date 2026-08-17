import { create } from "zustand"

export const useThemeStore = create((set)=>({
    theme:"business",
    setTheme: (theme) => set({theme}),
}));