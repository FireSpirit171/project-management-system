import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../../Types";
import { divideTasksByStatus } from "../../utils/Utils";
import styles from "./BoargPage.module.css";
import { useParams } from "react-router-dom";
import TaskCard from "../../components/TaskCard/TaskCard";

const BoardPage = () => {
  const id = useParams<{ id: string }>();
  const [_, setTasks] = useState<Task[]>([]);
  const [toDoTasks, setToDoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/api/v1/boards/${id.id}`)
      .then((res) => {
        setTasks(res.data.data);
        return res.data.data;
      })
      .then((tasks) => {
        const dividedTasks = divideTasksByStatus(tasks);
        setToDoTasks(dividedTasks[0]);
        setInProgressTasks(dividedTasks[1]);
        setDoneTasks(dividedTasks[2]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className={styles.board}>
      <section className={styles.column}>
        <h2 className={styles.title}>To do</h2>
        <div className={styles.tasks}>
          {toDoTasks.map((task) => (
            <TaskCard key={task.id} id={task.id} title={task.title} />
          ))}
        </div>
      </section>

      <section className={`${styles.column} ${styles.middle}`}>
        <h2 className={styles.title}>In progress</h2>
        <div className={styles.tasks}>
          {inProgressTasks.map((task) => (
            <TaskCard key={task.id} id={task.id} title={task.title} />
          ))}
        </div>
      </section>

      <section className={styles.column}>
        <h2 className={styles.title}>Done</h2>
        <div className={styles.tasks}>
          {doneTasks.map((task) => (
            <TaskCard key={task.id} id={task.id} title={task.title} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default BoardPage;
