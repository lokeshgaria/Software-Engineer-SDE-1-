import useTodoList from "../hooks/useTodoList";
import {
  Checkbox,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
console.log('render')
const TodoApp: React.FC = () => {
  const {
    todos,
    newTodo,
    editingId,
    editedTitle,
    deleteTodo,
    handleBlur,
    handleDoubleClick,
    handleTitleChange,
    deleteCompleted,
    toggleComplete,
    addTodo,
    setNewTodo,
  } = useTodoList();

  return (
    <div className="todo-app">
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>

      <div className="todo-input">
        <TextField
          label="Enter Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add
        </Button>
      </div>

      <List>
        {todos.map((todo: Todo) => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {editingId === todo.id ? (
              <TextField
                value={editedTitle}
                onChange={handleTitleChange}
                onBlur={() => handleBlur(todo.id)}
                fullWidth
                autoFocus
              />
            ) : (
              <Typography
                onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                variant="body1"
              >
                {todo.title}
              </Typography>
            )}
            <IconButton onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Button variant="outlined" color="secondary" onClick={deleteCompleted}>
        Clear Completed
      </Button>
    </div>
  );
};

export default TodoApp;
