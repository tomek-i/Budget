import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import { baseAPI } from './features/api/api';
export const store = configureStore({
  reducer: {
    user: userReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      baseAPI.middleware,
    );
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
