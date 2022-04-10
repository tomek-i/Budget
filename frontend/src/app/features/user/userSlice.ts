import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
interface UserState {
  id?: number;
  username?: string;
  token?: string;
  email?: string;
}

// Define the initial state using that type
const initialState: UserState = {
  id: undefined,
  username: undefined,
  token: undefined,
  email: undefined,
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
      if (payload) {
        state.username = payload.username;
        state.email = payload.email;
        state.token = payload.token;
      }
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
