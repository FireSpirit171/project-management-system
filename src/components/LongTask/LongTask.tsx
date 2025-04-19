import { useDispatch } from "react-redux";
import { Task } from "../../Types";
import styles from "./LongTask.module.css";
import { showModal } from "../../store/modalSlice";
import { useEffect, useRef, useState } from "react";

interface LongTaskProps {
  task: Task;
  highlight: boolean;
}

const LongTask = ({ task, highlight = false }: LongTaskProps) => {
  const dispatch = useDispatch();
  const [highlighted, setHighlighted] = useState(false);
  const taskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlight) {
      setHighlighted(true);
      taskRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      const timer = setTimeout(() => setHighlighted(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [highlight]);

  const handleClick = () => {
    dispatch(showModal({ type: "editTask", payload: task }));
  };

  return (
    <article
      ref={taskRef}
      className={`${styles.card} ${highlighted ? styles.highlight : ""}`}
      onClick={handleClick}
    >
      <span className={styles.cardBody}>
        {task.id}. {task.title}
      </span>
    </article>
  );
};

export default LongTask;
