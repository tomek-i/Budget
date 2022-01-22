import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
interface UserState {
  id?: number;
  username?: string;
  token?: string;
  blocked?: boolean;
  confirmed?: boolean;
  createdAt?: string;
  email?: string;
  provider?: string;
  updatedAt?: string;
}

// Define the initial state using that type
const initialState: UserState = {
  id: undefined,
  username: undefined,
  token: undefined,
  blocked: undefined,
  confirmed: undefined,
  createdAt: undefined,
  email: undefined,
  provider: undefined,
  updatedAt: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      console.log({ state, action: action.type, payload: action.payload });
      const payload = action.payload;
      delete state.id;
      state.username = payload.username;
    },
    logout: () => {
      localStorage.removeItem('accessToken');
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsername = (state: RootState) => state.user.username;

export default userSlice.reducer;
