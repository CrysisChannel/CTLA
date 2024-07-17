import { useState } from "react";
import cfg from "../../CTLAConfig";
import styles from "./TodoItem.module.css";

type TodoItem = {
  id: number;
  isCompleted: boolean;
  content: string;
};
type Props = {
  todo: TodoItem;
};
const TodoItem = ({ todo }: Props) => {
  const [value, setValue] = useState(todo.isCompleted);
  function checkboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (!value) {
      fetch(cfg.BACKEND_POST_DATA_URL + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: todo.id }),
      });
    }
    setValue((state) => !state);
  }
  return (
    <div key={todo.id} id={"todo-" + todo.id} className={styles.todo}>
      <input
        type="checkbox"
        checked={value}
        className={styles.checkbox}
        onChange={checkboxHandler}
      />
      <p>{todo.content}</p>
    </div>
  );
};

export default TodoItem;
