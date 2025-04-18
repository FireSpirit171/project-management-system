import styles from "./CreateTaskForm.module.css";

const CreateTaskForm = () => {
  return (
    <form>
      <h2 className={styles.title}>Создание задачи</h2>
      <input type="text" placeholder="Название" />
      <textarea name="" id="" placeholder="Описание"></textarea>

      <label>
        <select id="project" name="project">
          <option value="0">Проект</option>
          <option value="1">Amsterdam</option>
          <option value="2">Buenos Aires</option>
          <option value="3">Delhi</option>
          <option value="4">Hong Kong</option>
          <option value="5">London</option>
        </select>
      </label>

      <label>
        <select id="priorite" name="priorite">
          <option value="0">Приоритет</option>
          <option value="1">Низкий</option>
          <option value="2">Средний</option>
          <option value="3">Высокий</option>
        </select>
      </label>

      <label>
        <select id="status" name="status">
          <option value="0">Статус</option>
          <option value="1">Не начато</option>
          <option value="2">В разработке</option>
          <option value="3">Готово</option>
        </select>
      </label>

      <label>
        <select id="project" name="project">
          <option value="0">Исполнитель</option>
          <option value="1">Amsterdam</option>
          <option value="2">Buenos Aires</option>
          <option value="3">Delhi</option>
          <option value="4">Hong Kong</option>
          <option value="5">London</option>
        </select>
      </label>

      <div className={styles.buttonContainer}>
        <button className={styles.button}>Создать</button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
