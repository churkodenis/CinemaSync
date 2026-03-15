import { useAppSelector } from "@/hooks/useRedux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const checkAuth = createAsyncThunk(
  `user/checkAuth`,
  (_, { dispatch }) => {
    try {
      const user = window.localStorage.getItem("userDetails");

      if (!user) {
        throw new Error("No token found");
      }

      dispatch(
        authenticate({
          token: JSON.parse(user).token,
          user: JSON.parse(user).user,
        })
      );
      return null;
    } catch {
      dispatch(logout());
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    authenticate(state, action) {
      const user = action.payload;
      state.user = user;
      window.localStorage.setItem("userDetails", JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      window.localStorage.removeItem("userDetails");
    },
  },
});

export const { setUser, authenticate, logout } = userSlice.actions;

export const useUserDetailsSelector = () =>
  useAppSelector((store) => store.user);

export default userSlice.reducer;
