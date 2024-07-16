import { useEffect, useState } from "react";
import styles from "./TodoList.module.css";
import cfg from "../../CTLAConfig";
import TodoItem from "../TodoItem/TodoItem";
import ModalWindow from "../ModalWindow/ModalWindow";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(cfg.BACKEND_GET_DATA_URL + "/todos").then((res) =>
      res.json().then((data) => setTodos(data))
    );
    const cb = (e: KeyboardEvent) => {
      if (e.key == "h" && e.altKey) setShowModal((state) => !state);
    };
    document.addEventListener("keydown", cb);
    return () => document.removeEventListener("keydown", cb);
  }, []);
  function todosCreater(todos: TodoItem[]) {
    return todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
  }
  return (
    <div className={styles.wrapper}>
      {showModal && (
        <ModalWindow w="30vw" h="15vh">
          {/* PRESS ALT+A to add new Todo */}
          {/* <br /> */}
          PRESS ALT+H to open/close this menu
        </ModalWindow>
      )}
      {todosCreater(todos)}
    </div>
  );
};

export default TodoList;
