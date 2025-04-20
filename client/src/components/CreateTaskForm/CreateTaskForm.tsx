import { useEffect, useState } from "react";
import styles from "./CreateTaskForm.module.css";
import { Board, User } from "../../Types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideModal } from "../../store/modalSlice";
import { useNavigate } from "react-router-dom";

const CreateTaskForm = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [boardId, setBoardId] = useState("0");
  const [priority, setPriority] = useState("0");
  const [assigneeId, setAssigneeId] = useState("0");

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

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || priority === "0") {
      alert("Пожалуйста, заполните название, описание и приоритет.");
      return;
    }

    const priorityMap: Record<string, string> = {
      "1": "Low",
      "2": "Medium",
      "3": "High",
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8080/api/v1/tasks/create",
        {
          title,
          description,
          priority: priorityMap[priority],
          boardId: Number(boardId),
          assigneeId: Number(assigneeId),
        }
      );

      const newTaskId = res.data.data.id;
      dispatch(hideModal());
      navigate(`/issues?highlight=${newTaskId}`);
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании задачи");
    }
  };

  return (
    <form onSubmit={addTask}>
      <h2 className={styles.title}>Создание задачи</h2>

      <input
        className={styles.input}
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className={styles.textarea}
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label className={styles.label}>
        <select value={boardId} onChange={(e) => setBoardId(e.target.value)}>
          <option value="0">Проект</option>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="0">Приоритет</option>
          <option value="1">Низкий</option>
          <option value="2">Средний</option>
          <option value="3">Высокий</option>
        </select>
      </label>

      <label className={styles.label}>
        <select
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
        >
          <option value="0">Исполнитель</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.buttonContainer}>
        <button className={styles.button} type="submit">
          Создать
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
