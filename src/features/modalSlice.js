import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ModalsType: "",
  ModalsDetail: { title: "", status: ""},
  ModalsOpen: false,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { ModalsDetail, ModalsType } = action.payload;
      return {
        ...state,
        ModalsDetail,
        ModalsType,
        ModalsOpen: true,
      };
    },

    closeModal: (state) => {
      return {
        ...state,
        ModalsDetail: { title: "", status: ""},
        ModalsOpen: false,
        ModalsType: "",
      };
    },

    changeModalsDetail: (state, action) => {
      return {
        ...state,
        ModalsDetail: {
          ...action.payload
        },
      }
    }
  },
});

export const { openModal, closeModal, changeModalsDetail } = ModalSlice.actions;

export default ModalSlice.reducer;
