import { useEffect, useState } from "react";
import styles from "./BoardsPage.module.css";
import axios from "axios";
import { Board } from "../../Types";
import BoardCard from "../../components/BoardCard/BoardCard";

const BoardsPage = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/v1/boards")
      .then((res) => setBoards(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles.boards}>
      {boards.map((board) => (
        <BoardCard key={board.id} {...board} />
      ))}
    </section>
  );
};

export default BoardsPage;
