import { createSlice } from "@reduxjs/toolkit";
import data from '../data/data.json'

export const boardTabsSlice = createSlice({
    name: "boardTabs",
    initialState: JSON.parse(localStorage.getItem("data")) || data,
    reducers: {
        deleteBoard: (state, action) => {
            const { name } = action.payload;
            const boardToDeleteIndex = state.findIndex(board => board.name === name);

            if(boardToDeleteIndex !== -1){
                state.splice(boardToDeleteIndex, 1)
            }
        },

        addBoard: (state, action) => {
            state.push(action.payload)
        },

        editBoard: (state, action) => {
            const { name, board } = action.payload;
            const boardToEditIndex = state.findIndex(board => board.name === name)
            state.splice(boardToEditIndex, 1, board)
        },


        deleteTask: (state, action) => {
            const { taskName } = action.payload;
            
        }
    }
})


export default boardTabsSlice.reducer;
export const { deleteBoard, addBoard, deleteTask, editBoard } = boardTabsSlice.actions;