import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/modalSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header>
      <nav>
        <NavLink
          to="/issues"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Все задачи
        </NavLink>
        <NavLink
          to="/boards"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Проекты
        </NavLink>
      </nav>

      <button onClick={() => dispatch(showModal({ type: "createTask" }))}>
        Создать задачу
      </button>
    </header>
  );
};

export default Header;
