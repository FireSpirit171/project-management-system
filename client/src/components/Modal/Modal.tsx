import styles from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { hideModal } from "../../store/modalSlice";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import EditTaskForm from "../EditTaskForm/EditTaskForm";

const Modal = () => {
  const dispatch = useDispatch();
  const { isVisible, type, payload } = useSelector(
    (state: RootState) => state.modal
  );

  const modalClasses = [styles.modal];
  if (isVisible) {
    modalClasses.push(styles.active);
  }

  const renderForm = () => {
    switch (type) {
      case "createTask":
        return <CreateTaskForm />;
      case "editTask":
        return <EditTaskForm task={payload} />;
      default:
        return null;
    }
  };

  return (
    <section
      className={modalClasses.join(" ")}
      onClick={() => dispatch(hideModal())}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {renderForm()}
      </div>
    </section>
  );
};

export default Modal;
