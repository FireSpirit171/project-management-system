import { Task } from "../../Types";
import styles from "./EditTaskForm.module.css";

interface EditTaskFormProps {
  task: Task | null;
}

const EditTaskForm = ({ task }: EditTaskFormProps) => {
  return (
    <form>
      <h2 className={styles.title}>Редактирование задачи</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Название"
        value={task!.title}
      />
      <textarea className={styles.textarea} placeholder="Описание">
        {task!.description}
      </textarea>

      <label className={styles.label}>
        <select id="project" name="project">
          <option value="0">{task!.boardName}</option>
          <option value="1">Amsterdam</option>
          <option value="2">Buenos Aires</option>
          <option value="3">Delhi</option>
          <option value="4">Hong Kong</option>
          <option value="5">London</option>
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
          <option value="0">{task!.assignee.fullName}</option>
          <option value="1">Amsterdam</option>
          <option value="2">Buenos Aires</option>
          <option value="3">Delhi</option>
          <option value="4">Hong Kong</option>
          <option value="5">London</option>
        </select>
      </label>

      {task?.boardId ? (
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.orange}`}>
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
