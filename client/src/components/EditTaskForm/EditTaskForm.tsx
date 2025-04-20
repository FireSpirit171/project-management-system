import { useNavigate } from "react-router-dom";
import { Task, User } from "../../Types";
import styles from "./EditTaskForm.module.css";
import { useDispatch } from "react-redux";
import { hideModal } from "../../store/modalSlice";
import { useState, useEffect } from "react";
import axios from "axios";

interface EditTaskFormProps {
  task: Task | null;
}

const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "Medium");
  const [status, setStatus] = useState(task?.status || "Not Started");
  const [assigneeId, setAssigneeId] = useState(task?.assignee.id || 0);

  const isBoardPage = location.pathname.startsWith("/boards/");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/v1/users")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const goToBoard = (boardId: number | null) => {
    dispatch(hideModal());
    navigate(`/boards/${boardId}`);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8080/api/v1/tasks/update/${task?.id}`, {
        title,
        description,
        priority,
        status,
        assigneeId,
      });

      dispatch(hideModal());

      if (isBoardPage) {
        navigate(0);
      } else {
        navigate(`/issues?highlight=${task?.id}`);
      }
    } catch (error) {
      console.error("Ошибка при обновлении задачи", error);
    }
  };

  return (
    <form>
      <h2 className={styles.title}>Редактирование задачи</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Название"
        defaultValue={task!.title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="Описание"
        defaultValue={task!.description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          value={task?.boardName || "Проект"}
          disabled
        />
      </label>

      <label className={styles.label}>
        <select
          id="priorite"
          name="priorite"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="0">Приоритет</option>
          <option value="Low">Низкий</option>
          <option value="Medium">Средний</option>
          <option value="High">Высокий</option>
        </select>
      </label>

      <label className={styles.label}>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="0">Статус</option>
          <option value="Backlog">Не начато</option>
          <option value="InProgress">В разработке</option>
          <option value="Done">Готово</option>
        </select>
      </label>

      <label className={styles.label}>
        <select
          id="employee"
          name="employee"
          value={assigneeId}
          onChange={(e) => setAssigneeId(Number(e.target.value))}
        >
          <option value="0">Исполнитель</option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
      </label>

      {task?.boardId ? (
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.orange}`}
            onClick={(e) => {
              e.preventDefault();
              goToBoard(task.boardId);
            }}
          >
            Перейти на доску
          </button>
          <button
            className={`${styles.button} ${styles.green}`}
            onClick={handleUpdate}
          >
            Обновить
          </button>
        </div>
      ) : (
        <div className={styles.buttonWrap}>
          <button
            className={`${styles.button} ${styles.green}`}
            onClick={handleUpdate}
          >
            Обновить
          </button>
        </div>
      )}
    </form>
  );
};

export default EditTaskForm;
