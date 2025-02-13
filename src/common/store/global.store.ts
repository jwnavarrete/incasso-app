// common/store/global.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUserInfo } from "@/modules/auth/interfaces/auth.interface";
import { getUserInfo } from "../lib/userInfo";

// Define el tipo del estado inicial
export interface AppState {
  user: iUserInfo | null;
  isAuthenticated: boolean | null; // Agregado para manejar la autenticación
}

// Estado inicial
const initialState: AppState = {
  user: null,
  isAuthenticated: false, // Agregado para manejar la autenticación
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
  },
});

// Exporta las acciones
export const { setUser, logout } = userSlice.actions;

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
  }
};

export default store;
