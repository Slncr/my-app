import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./TodoPanel.module.scss";
import { Todo } from "../../App";
import { useTodo } from "../../utils";

const DEFAULT_TODO = {
  id: "",
  name: "",
  description: "",
};

interface AddTodoPanelProps {
  mode: "add";
}
interface EditTodoPanelProps {
  mode: "edit";
  editTodo: Omit<Todo, "id" | "checked">;
}
type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  const { changeTodo, addTodo } = useTodo();
  const isEdit = props.mode === "edit";
  const [todo, setTodo] = useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onClick = () => {
    const todoItem = { name: todo.name, description: todo.description };
    if (isEdit) {
      return changeTodo(todoItem);
    }

    addTodo(todoItem);
    setTodo(DEFAULT_TODO);
  };

  return (
    <div className={styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label className={styles.field_container_label} htmlFor="name">
            <div>name</div>
            <input
              className={styles.field_container_input}
              type="text"
              id="name"
              value={todo.name}
              name="name"
              onChange={onChange}
            />
          </label>
        </div>
        <div className={styles.field_container}>
          <label className={styles.field_container_label} htmlFor="decription">
            <div>description</div>
            <input
              className={styles.field_container_input}
              type="text"
              id="description"
              value={todo.description}
              name="description"
              onChange={onChange}
            />
          </label>
        </div>
      </div>
      <div className={styles.button_container}>
        {!isEdit && (
          <Button color="blue" onClick={onClick}>
            ADD
          </Button>
        )}
        {isEdit && (
          <Button color="orange" onClick={onClick}>
            EDIT
          </Button>
        )}
      </div>
    </div>
  );
};
