import { configureStore } from "@reduxjs/toolkit";
import modalreducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
