import { useNavigate } from "react-router-dom";
import { Board } from "../../Types";
import styles from "./BoardCard.module.css";

const BoardCard = (board: Board) => {
  const navigate = useNavigate();

  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/boards/${board.id}`)}
    >
      <span className={styles.cardBody}>
        {board.id}. {board.name}
      </span>
    </article>
  );
};

export default BoardCard;
