import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: {
    id: string;
    username: string;
    email?: string;
    avatar?: string;
    role?: string;
  } | null;
  accessToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: UserState['user']; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearUser(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;