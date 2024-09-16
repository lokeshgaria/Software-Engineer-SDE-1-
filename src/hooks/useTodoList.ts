import React, { useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);  
  const [editedTitle, setEditedTitle] = useState<string>(""); 

  // Load todos from local storage  
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error("Error parsing todos from local storage:", error);
        setTodos([]);
      }
    }
  }, []);

  // Save todos to local storage  
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
    setEditingId(null); 
  };

  const deleteCompleted = () => {
    let filterTodos = todos.filter((todo) => !todo.completed);

    setTodos(filterTodos);
    localStorage.setItem("todos", JSON.stringify(filterTodos));
  };

  const handleDoubleClick = (id: number, title: string) => {
    setEditingId(id);  
    setEditedTitle(title);  
  };

  const handleBlur = (id: number) => {
    editTodo(id, editedTitle); 
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);  
  };

  const deleteTodo = (id: number) => {
    let filterTodos = todos.filter((t) => t.id !== id);

    setTodos(filterTodos);
    localStorage.setItem("todos", JSON.stringify(filterTodos));
  };

  return {
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
    editTodo,
    addTodo,
    setNewTodo,
    setTodos,
  };
};

export default useTodoList;
