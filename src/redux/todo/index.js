import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
        id: 1,
        title: "Learn React",
        body: "lorem ipsum dolor sit amet, consectetur adipiscing",
        completed: false
    },
    {
        id: 2,
        title: "Build an App",
        body: "lorem ipsum dolor sit amet, consectetur adipiscing",
        completed: true
    }
  ]
}

const todoSlice = createSlice({    
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            state.todos.forEach(el => {
                if(el.id === action.payload) {
                    el.completed =!el.completed;
                }
            })
        }
    }
})

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;