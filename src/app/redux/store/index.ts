import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import bookReducer from "../slices/bookSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
