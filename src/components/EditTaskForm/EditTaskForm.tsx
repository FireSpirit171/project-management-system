import { useNavigate } from "react-router-dom";
import { Task, Board, User } from "../../Types";
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

  const [boards, setBoards] = useState<Board[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/v1/boards")
      .then((res) => setBoards(res.data.data))
      .catch((err) => console.error(err));
  }, []);

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

  return (
    <form>
      <h2 className={styles.title}>Редактирование задачи</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Название"
        defaultValue={task!.title}
      />
      <textarea
        className={styles.textarea}
        placeholder="Описание"
        defaultValue={task!.description}
      ></textarea>

      <label className={styles.label}>
        <select id="boards" name="boards">
          <option value="0">Проект</option>
          {boards.map((board: Board) => (
            <option value={board.id}>{board.name}</option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        <select id="priorite" name="priorite">
          <option value="0">Приоритет</option>
          <option value="1">Низкий</option>
          <option value="2">Средний</option>
          <option value="3">Высокий</option>
        </select>
      </label>

      <label className={styles.label}>
        <select id="status" name="status">
          <option value="0">Статус</option>
          <option value="1">Не начато</option>
          <option value="2">В разработке</option>
          <option value="3">Готово</option>
        </select>
      </label>

      <label className={styles.label}>
        <select id="employee" name="employee">
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
          <button className={`${styles.button} ${styles.green}`}>
            Обновить
          </button>
        </div>
      ) : (
        <div className={styles.buttonWrap}>
          <button className={`${styles.button} ${styles.green}`}>
            Обновить
          </button>
        </div>
      )}
    </form>
  );
};

export default EditTaskForm;
