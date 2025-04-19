import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Board, Task } from "../../Types";
import styles from "./BoardCard.module.css";

const COLORS = ["#ff9800", "#2196f3", "#4caf50"];

const BoardCard = (board: Board) => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    axios
      .get<{ data: Task[] }>(`http://127.0.0.1:8080/api/v1/boards/${board.id}`)
      .then((res) => {
        const tasks = res.data.data;
        const b = tasks.filter((t) => t.status === "Backlog").length;
        const p = tasks.filter((t) => t.status === "InProgress").length;
        const d = tasks.filter((t) => t.status === "Done").length;
        setCounts([b, p, d]);
      })
      .catch(console.error);
  }, [board.id]);

  const total = counts.reduce((sum, v) => sum + v, 0) || 1;
  const percentages = counts.map((c) => (c / total) * 100);

  const radius = 30;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;

  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/boards/${board.id}`)}
    >
      <span className={styles.cardBody}>
        {board.id}. {board.name}
      </span>

      <div
        className={styles.chartContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.circleWrapper}>
          <svg
            className={styles.circle}
            width={radius * 2 + strokeWidth}
            height={radius * 2 + strokeWidth}
            viewBox={`0 0 ${radius * 2 + strokeWidth} ${
              radius * 2 + strokeWidth
            }`}
          >
            <g
              transform={`translate(${radius + strokeWidth / 2}, ${
                radius + strokeWidth / 2
              })`}
            >
              {percentages.map((pct, idx) => {
                const dashArray = `${
                  (pct / 100) * circumference
                } ${circumference}`;
                const circle = (
                  <circle
                    key={idx}
                    r={radius}
                    fill="transparent"
                    stroke={COLORS[idx]}
                    strokeWidth={strokeWidth}
                    strokeDasharray={dashArray}
                    strokeDashoffset={-offsetAcc}
                  />
                );
                offsetAcc += (pct / 100) * circumference;
                return circle;
              })}
            </g>
          </svg>
          <div className={styles.inside}>{Math.round(percentages[2])}%</div>
        </div>

        <figure className={styles.table}>
          <table>
            <tbody>
              {[
                {
                  label: "Не начато",
                  percent: percentages[0],
                  color: COLORS[0],
                },
                {
                  label: "В разработке",
                  percent: percentages[1],
                  color: COLORS[1],
                },
                { label: "Готово", percent: percentages[2], color: COLORS[2] },
              ].map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ backgroundColor: item.color }} />
                    {Math.round(item.percent)}
                  </td>
                  <td>{item.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </div>
    </article>
  );
};

export default BoardCard;
