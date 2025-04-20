import { useEffect, useState } from "react";
import { Task } from "../../Types";
import LongTask from "../../components/LongTask/LongTask";
import axios from "axios";
import styles from "./IssuesPage.module.css";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/modalSlice";
import Filter from "../../components/Filter/Filter";
import { useLocation } from "react-router-dom";

const IssuesPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("0");
  const [selectedBoardId, setSelectedBoardId] = useState<string>("0");

  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const highlightId = Number(params.get("highlight"));

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/v1/tasks")
      .then((res) => {
        setTasks(res.data.data);
        setFilteredTasks(res.data.data);
      })
      .catch((err) => console.error(err));
  }, [highlightId]);

  const filterTasks = (
    baseTasks: Task[],
    search: string,
    status: string,
    boardId: string
  ): Task[] => {
    const lowerCased = search.toLowerCase();

    return baseTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(lowerCased) ||
        task.assignee.fullName.toLowerCase().includes(lowerCased);
      const matchesStatus = status === "0" || task.status === status;
      const matchesBoard = boardId === "0" || task.boardId === Number(boardId);
      return matchesSearch && matchesStatus && matchesBoard;
    });
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    setFilteredTasks(
      filterTasks(tasks, newValue, selectedStatus, selectedBoardId)
    );
  };

  const handleApplyFilters = () => {
    setFilteredTasks(
      filterTasks(tasks, inputValue, selectedStatus, selectedBoardId)
    );
    setOpenFilter(false);
  };

  const handleResetFilters = () => {
    setSelectedStatus("0");
    setSelectedBoardId("0");
    setInputValue("");
    setFilteredTasks(tasks);
    setOpenFilter(false);
  };

  const handleClick = (): void => {
    dispatch(showModal({ type: "createTask" }));
  };

  return (
    <main>
      {openFilter && (
        <section className={styles.modal} onClick={() => setOpenFilter(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Filter
              selectedStatus={selectedStatus}
              selectedBoardId={selectedBoardId}
              setSelectedStatus={setSelectedStatus}
              setSelectedBoardId={setSelectedBoardId}
              applyFilters={handleApplyFilters}
              resetFilters={handleResetFilters}
            />
          </div>
        </section>
      )}

      <div className={styles.filters}>
        <div className={styles.inputContainer}>
          <input
            className={styles.search}
            type="text"
            placeholder="Поиск по названию и исполнителю"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>

        <div className={styles.filter} onClick={() => setOpenFilter(true)}>
          <p>Фильтры</p>
          <img src="/svg/sliders-icon.svg" width={16} height={16} />
        </div>
      </div>

      <section className={styles.list}>
        {filteredTasks.map((task: Task) => (
          <LongTask
            key={task.id}
            task={task}
            highlight={task.id === highlightId}
          />
        ))}
      </section>

      <div className={styles.buttonContainer}>
        <button className={styles.createButton} onClick={handleClick}>
          Создать задачу
        </button>
      </div>
    </main>
  );
};

export default IssuesPage;
