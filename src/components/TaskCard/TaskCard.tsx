import { Task } from "../../Types";
import styles from "./TaskCard.module.css";

const TaskCard = ({ id, title }: Pick<Task, "id" | "title">) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
    </div>
  );
};

export default TaskCard;
