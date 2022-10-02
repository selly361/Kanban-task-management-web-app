import boardTabsSlice from '../features/boardTabsSlice';
import { configureStore } from '@reduxjs/toolkit';
import dataSlice from '../features/dataSlice';

export const store = configureStore({
  reducer: {
    boardTabs: boardTabsSlice,
    data: dataSlice
  },
});
