import { useEffect, useRef, useState } from "react";
import TodoItem, { TodoItem as TodoItemType } from "../TodoItem/TodoItem";
import ModalWindow from "../ModalWindow/ModalWindow";
import cfg from "../../CTLAConfig";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const contentInput = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getTodos();
    const cb = (e: KeyboardEvent) => {
      if (e.key == "h" && e.altKey) {
        setShowAddModal(false);
        setShowModal((state) => !state);
      } else if (e.key == "a" && e.altKey) {
        setShowModal(false);
        setShowAddModal((state) => !state);
      }
    };
    document.addEventListener("keydown", cb);
    return () => document.removeEventListener("keydown", cb);
  }, []);
  function getTodos() {
    fetch(cfg.BACKEND_GET_DATA_URL + "/todos").then((res) =>
      res.json().then((data) => setTodos(data))
    );
  }
  function todosCreater(todos: TodoItemType[]) {
    return todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
  }
  function clickHandler() {
    if (!contentInput.current) return;
    setShowAddModal(false);
    fetch(cfg.BACKEND_POST_DATA_URL + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: contentInput.current.value,
      }),
    }).then(() => getTodos());
  }
  return (
    <div className={styles.wrapper}>
      {showModal && (
        <ModalWindow w="30vw" h="15vh">
          PRESS ALT+A to add new Todo
          <br />
          PRESS ALT+H to open/close this menu
        </ModalWindow>
      )}
      {showAddModal && (
        <ModalWindow w="30vw" h="15vh">
          <input
            type="text"
            id="content"
            className={styles.content}
            ref={contentInput}
          />
          <button onClick={clickHandler}>Создать</button>
        </ModalWindow>
      )}
      {todosCreater(todos)}
    </div>
  );
};

export default TodoList;
