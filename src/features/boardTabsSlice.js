import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

export const boardTabsSlice = createSlice({
  name: "boardTabs",
  initialState: JSON.parse(localStorage.getItem("board-tabs")) || data,
  reducers: {
    deleteBoard: (state, action) => {
      const activeBoard = action.payload;
      const boardToDeleteIndex = state.findIndex(
        (board) => board.name === activeBoard
      );

      if (boardToDeleteIndex !== -1) {
        state.splice(boardToDeleteIndex, 1);
      }
    },

    addBoard: (state, action) => {
      console.log(action.payload);
      state.push(action.payload);
    },

    editBoard: (state, action) => {
      const { boardToEdit, activeBoard } = action.payload;
      const boardToEditIndex = state.findIndex(
        (board) => board.name === activeBoard
      );
      state.splice(boardToEditIndex, 1, boardToEdit);
    },

    addTask: (state, action) => {
      const { newTask, activeBoard } = action.payload;
      let columns = state.find((board) => board.name === activeBoard).columns;

      let columnIndex = columns.findIndex(
        (column) => column.name === newTask.status
      );

      if (columnIndex !== -1) {
        columns[columnIndex]["tasks"].push(newTask);
      }
    },

    viewTask: (state, action) => {
      const { type, taskTitle, activeBoard, oldTask, newTask } = action.payload;

      let columns = state.find((board) => board.name === activeBoard).columns;

      let column = columns.find((column) => column.name === oldTask?.status);
      let newColumn = columns.find((column) => column.name === newTask?.status);

      let taskIndex = column?.tasks.findIndex(
        (task) => task.title === taskTitle
      );

      if (type === "status") {
        if (newTask?.status === column?.name) {
          column[taskIndex] = newTask;
        } else if (newTask?.status !== column?.name) {
          column?.tasks.splice(taskIndex, 1);

          newColumn?.tasks.push(newTask);
        }
      } else {
        let t = newColumn?.tasks.find((task) => task.title === taskTitle);
        t.subtasks = newTask.subTasks;
      }
    },

    editTask: (state, action) => {
      const { activeBoard, newTask, oldStatus } = action.payload;
      console.log(newTask.status, oldStatus)
      let currentBoard = state.find((board) => board.name === activeBoard);
      let newColumn = currentBoard.columns.find((column) => column.name === newTask.status);
      let oldColumn = currentBoard.columns.find((column) => column.name === oldStatus);
      let taskIndex = oldColumn.tasks.findIndex((task) => task.title === newTask.title);

      if(newTask.status === oldStatus){
        oldColumn.tasks.splice(taskIndex, 1, newTask)

      } else if(newTask.status !== oldStatus) {
        oldColumn.tasks.splice(taskIndex, 1)
        newColumn.tasks.push(newTask)
      }
      
    },

    deleteTask: (state, action) => {
      const { activeBoard, title, status } = action.payload;

      let currentBoard = state.find((board) => board.name === activeBoard);
      let column = currentBoard.columns.find(
        (column) => column.name === status
      );
      let taskIndex = column?.tasks.findIndex((task) => task.title === title);

      column?.tasks.splice(taskIndex, 1);
    },
  },
});

export default boardTabsSlice.reducer;
export const {
  deleteBoard,
  addBoard,
  deleteTask,
  editBoard,
  addTask,
  viewTask,
  editTask,
} = boardTabsSlice.actions;
