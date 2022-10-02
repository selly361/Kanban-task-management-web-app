import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  ModalsType: "",
  ModalsDetail: {},
  ModalsOpen: false
};

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {

    openModal: (state, action) => {
        return {
            ...state,
            ModalsOpen: true,
            ...action.payload
        }
    },

    closeModal: (state) => {
        return {
            ...state,
            ModalsOpen: false,
            ModalsType: ""
        }
    }
    

  },
});

export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;