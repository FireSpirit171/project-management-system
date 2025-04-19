import { useDispatch } from "react-redux";
import { Task } from "../../Types";
import styles from "./LongTask.module.css";
import { showModal } from "../../store/modalSlice";

interface LongTaskProps {
  task: Task;
}

const LongTask = ({ task }: LongTaskProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showModal({ type: "editTask", payload: task }));
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      <span className={styles.cardBody}>
        {task.id}. {task.title}
      </span>
    </article>
  );
};

export default LongTask;
