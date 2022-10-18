import React from "react";
import { Todo } from "../../App";
import { TodoContext } from "./TodoContext";

const id = Date.now();

const DEFAULT_TODO_LIST = [
  {
    id,
    name: "task 1",
    description: "description 1",
    checked: false,
  },
];
interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo["id"] | null>(
    null
  );

  const selectTodoIdForEdit = (id: Todo["id"]) => {
    setTodoIdForEdit(id);
  };

  const addTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
    setTodos([
      ...todos,
      {
        id: Date.now() || todos[todos.length - 1].id + 1,
        description,
        name,
        checked: false,
      },
    ]);
  };
  const checkTodo = (id: Todo["id"]) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: Todo["id"]) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const changeTodo = ({ name, description }: Omit<Todo, "checked" | "id">) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, name, description };
        }
        return todo;
      })
    );
    setTodoIdForEdit(null);
  };
  const value = React.useMemo(
    () => ({
      todoIdForEdit,
      todos,
      deleteTodo,
      changeTodo,
      addTodo,
      selectTodoIdForEdit,
      checkTodo,
    }),
    [
      todoIdForEdit,
      todos,
      deleteTodo,
      changeTodo,
      addTodo,
      selectTodoIdForEdit,
      checkTodo,
    ]
  );
  return <TodoContext.Provider value={value}>{children} </TodoContext.Provider>;
};
