import { useDispatch } from "react-redux";
import { Task } from "../../Types";
import styles from "./TaskCard.module.css";
import { showModal } from "../../store/modalSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskCard = ({ id, title }: Pick<Task, "id" | "title">) => {
  const dispatch = useDispatch();
  const [task, setTasks] = useState<Task | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/api/v1/tasks/${id}`)
      .then((res) => setTasks(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    dispatch(showModal({ type: "editTask", payload: task }));
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h3>{title}</h3>
    </div>
  );
};

export default TaskCard;
