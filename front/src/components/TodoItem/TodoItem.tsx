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
  return (
    <div key={todo.id} id={"todo-" + todo.id} className={styles.todo}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        className={styles.checkbox}
      />
      <p>{todo.content}</p>
    </div>
  );
};

export default TodoItem;
