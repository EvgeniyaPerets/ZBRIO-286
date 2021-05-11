import { Box, Button, Checkbox, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store'
import { addTodo, editTodo, removeTodo, setTodoStatus } from './redux/todoSlice';

const App = () => {
  const [ todoDescription, setTodoDescription ] = useState("");
  const [ todoDescriptionEdit, setTodoDescriptionEdit ] = useState("");
  const [ todoIdEdit, setTodoIdEdit ] = useState("");
  const [ inEdit, setInEdit ] = useState(false);

  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container maxWidth="xs">
      <Typography style={{ textAlign: 'center' }} variant='h3'>
        Redux LIst App
      </Typography>
      { !inEdit ?
      <Box>
        <TextField
          variant='outlined'
          label='to do them'
          fullWidth
          onChange={(e) => setTodoDescription(e.target.value)}
          value={todoDescription}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={() => {
            if (todoDescription !== '') {
              dispatch(addTodo(todoDescription));
              setTodoDescription('')
            }
          }}
        >
          Add Item
        </Button>
      </Box> :
      <Box>
        <TextField
          variant='outlined'
          label='edit to do them'
          fullWidth
          onChange={(e) => setTodoDescriptionEdit(e.target.value)}
          value={todoDescriptionEdit}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={() => {
            setInEdit(false);
            setTodoIdEdit('');
            dispatch(editTodo({ discription: todoDescriptionEdit, id: todoIdEdit }));
          }}
        >
          Edit Item
        </Button>
      </Box>}
      <List>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.discription}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                disabled={inEdit}
                onClick={() => {
                  setInEdit(true)
                  setTodoDescriptionEdit(todo.discription)
                  setTodoIdEdit(todo.id)
                }}
              >
                <CreateIcon />
              </IconButton>
              <IconButton
                disabled={inEdit}
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Checkbox
                disabled={inEdit}
                edge='end'
                value={todo.completed}
                onChange={() => {
                  dispatch(setTodoStatus({ completed: !todo.completed, id: todo.id }))
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
