import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TUser } from "../../../types";

interface AuthState {
  user: TUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: TUser; token: string | null }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<TUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    // New action to handle registration data
    registerUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload; // Set the registered user in the state
    },
  },
});

export const { setUser, logout, updateUserInfo, registerUser } =
  authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
