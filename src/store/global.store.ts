import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUserInfo } from "@/common/types/auth/auth";
import { getUserInfo } from "@/utils/userInfo";

const defaultLanguage =
  (process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as "es" | "en" | "nl") || "nl";

// Define el tipo del estado inicial
export interface AppState {
  user: iUserInfo | null;
  isAuthenticated: boolean | null; // Agregado para manejar la autenticación
  language: "es" | "en" | "nl"; // Agregado para manejar el idioma
}

// Estado inicial
const initialState: AppState = {
  user: null,
  isAuthenticated: false, // Agregado para manejar la autenticación
  language: defaultLanguage,
};

// Crea un slice para manejar el estado del usuario
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<iUserInfo | null>) => {
      state.user = action.payload;
      state.isAuthenticated = true; // Si hay usuario, está autenticado
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false; // Al hacer logout, se cambia el estado de autenticación
    },
    setLanguage: (state, action: PayloadAction<"es" | "en" | "nl">) => {
      state.language = action.payload; // Actualiza el idioma
    },
  },
});

// Exporta las acciones
export const { setUser, logout, setLanguage } = userSlice.actions;

// Crea el store
const store = configureStore({
  reducer: userSlice.reducer,
});

// Función para inicializar el estado desde localStorage
export const initializeUser = () => {
  if (typeof window !== "undefined") {
    const userData = getUserInfo();
    if (userData) {
      store.dispatch(setUser(userData)); // Si hay datos del usuario, actualizamos el estado
    }

    store.dispatch(
      setLanguage(
        (localStorage.getItem("language") as "es" | "en" | "nl") ||
          defaultLanguage
      )
    );
  }
};

export default store;
