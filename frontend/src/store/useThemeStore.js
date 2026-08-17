import { create } from "zustand"

export const useThemeStore = create((set)=>({
    theme: localStorage.getItem( "gchatApp-theme") || "business",

    setTheme: (theme) => {
        localStorage.setItem("gchatApp-theme" , theme);
        set({theme})
    }
}));

// storing for any kind of refress