import { Board } from "../../Types";
import styles from "./BoardCard.module.css";

const BoardCard = (board: Board) => {
  return (
    <article className={styles.card}>
      <span>{board.id}</span>
      <span>{board.name}</span>
    </article>
  );
};

export default BoardCard;
