import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { Todo } from './../models/Todo';

const initialState = [] as Todo[];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.push(action.payload)
            },
            prepare: (discription: string) => ({
                payload: {
                    id: v4(),
                    discription,
                    completed: false,
                } as Todo,
            }),
        },
        removeTodo(state, action: PayloadAction<string>) {
            const index = state.findIndex(todo => todo.id === action.payload);
            state.splice(index, 1);
        },
        setTodoStatus(state, action: PayloadAction<{ completed: boolean, id: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
    },
})

export const { addTodo, removeTodo, setTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;