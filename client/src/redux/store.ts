import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import emailReducer from "./emailSlice";
import authReducer from "./authSlice";
// ...

export const store = configureStore({
  reducer: {
    users: usersReducer,
    email: emailReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
