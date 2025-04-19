import { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import { Board } from "../../Types";
import axios from "axios";

interface FilterProps {
  selectedStatus: string;
  selectedBoardId: string;
  setSelectedStatus: (value: string) => void;
  setSelectedBoardId: (value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const Filter = ({
  selectedStatus,
  selectedBoardId,
  setSelectedStatus,
  setSelectedBoardId,
  applyFilters,
  resetFilters,
}: FilterProps) => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/v1/boards")
      .then((res) => setBoards(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.form}>
      <label className={styles.label}>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="0">Статус</option>
          <option value="Backlog">Не начато</option>
          <option value="In Progress">В разработке</option>
          <option value="Done">Готово</option>
        </select>
      </label>

      <label className={styles.label}>
        <select
          id="boards"
          value={selectedBoardId}
          onChange={(e) => setSelectedBoardId(e.target.value)}
        >
          <option value="0">Доска</option>
          {boards.map((board: Board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.red}`}
          onClick={resetFilters}
        >
          Сбросить
        </button>
        <button
          className={`${styles.button} ${styles.green}`}
          onClick={applyFilters}
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default Filter;
