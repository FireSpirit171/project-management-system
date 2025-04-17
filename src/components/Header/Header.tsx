import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
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

      <button>Создать задачу</button>
    </header>
  );
};

export default Header;
