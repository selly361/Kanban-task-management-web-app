import boardTabsReducer from '../features/boardTabsSlice';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/dataSlice';
import modalReducer from '../features/modalSlice';

export const store = configureStore({
  reducer: {
    boardTabs: boardTabsReducer,
    data: dataReducer,
    modal: modalReducer
  },
});
