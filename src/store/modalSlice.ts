import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../Types";

interface ModalState {
  isVisible: boolean;
  type: "createTask" | "editTask" | null;
  payload: Task | null;
}

const initialState: ModalState = {
  isVisible: false,
  type: null,
  payload: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (
      state,
      action: PayloadAction<{
        type: "createTask" | "editTask";
        payload?: Task | null;
      }>
    ) => {
      state.isVisible = true;
      state.type = action.payload.type;
      state.payload = action.payload.payload || null;
    },
    hideModal: (state) => {
      state.isVisible = false;
      state.type = null;
      state.payload = null;
    },
    toggleModal: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { showModal, hideModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
