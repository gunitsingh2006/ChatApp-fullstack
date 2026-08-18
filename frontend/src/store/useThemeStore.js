// import { create } from "zustand"

// export const useThemeStore = create((set)=>({
//     theme: localStorage.getItem( "gchatApp-theme") || "business",

//     setTheme: (theme) => {
//         localStorage.setItem("gchatApp-theme" , theme);
//         set({theme})
//     }
// }));

// storing for any kind of refress


import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "business",
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    set({ theme });
  },
}));