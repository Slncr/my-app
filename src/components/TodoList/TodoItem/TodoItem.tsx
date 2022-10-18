import React from "react";
import { Todo } from "../../../App";
import { Button } from "../../Button/Button";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  todo: Todo;
  checkTodo: (id: Todo["id"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  selectTodoIdForEdit: (id: Todo["id"]) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  checkTodo,
  deleteTodo,
  selectTodoIdForEdit,
}) => {
  console.log("@", todo);
  return (
    <div className={styles.todo_item_container}>
      <div
        aria-hidden
        style={{
          opacity: todo.checked ? 0.5 : 1,
          textDecoration: todo.checked ? "line-through" : "none",
        }}
        onClick={() => checkTodo(todo.id)}
        className={styles.todo_item_title}
      >
        <div>{todo.name}</div>
      </div>
      <div aria-hidden className={styles.todo_item_description}>
        <div>{todo.description}</div>
      </div>
      <div className={styles.todo_item_button_container}>
        <Button color="orange" onClick={() => selectTodoIdForEdit(todo.id)}>
          Edit
        </Button>
        <Button color="red" onClick={() => deleteTodo(todo.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
