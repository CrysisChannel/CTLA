import { useEffect, useState } from "react";
import styles from "./TodoList.module.css";
import cfg from "../../CTLAConfig";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  useEffect(() => {
    fetch(cfg.BACKEND_GET_DATA_URL + "/todos").then((res) =>
      res.json().then((data) => setTodos(data))
    );
  });
  function todosCreater(todos: TodoItem[]) {
    return todos.map((todo) => <TodoItem todo={todo} />);
  }
  return <div className={styles.wrapper}>{todosCreater(todos)}</div>;
};

export default TodoList;
