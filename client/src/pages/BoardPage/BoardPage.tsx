import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../../Types";
import { divideTasksByStatus } from "../../utils/Utils";
import styles from "./BoargPage.module.css";
import { useParams } from "react-router-dom";
import TaskCard from "../../components/TaskCard/TaskCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

const BoardPage = () => {
  const id = useParams<{ id: string }>();
  const [toDoTasks, setToDoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/api/v1/boards/${id.id}`)
      .then((res) => {
        const tasks = res.data.data;
        const dividedTasks = divideTasksByStatus(tasks);
        setToDoTasks(dividedTasks[0]);
        setInProgressTasks(dividedTasks[1]);
        setDoneTasks(dividedTasks[2]);
      })
      .catch((err) => console.error(err));
  }, []);

  const statusMap: Record<string, string> = {
    todo: "Backlog",
    inprogress: "InProgress",
    done: "Done",
  };

  const getTasksByDroppableId = (id: string): Task[] => {
    switch (id) {
      case "todo":
        return toDoTasks;
      case "inprogress":
        return inProgressTasks;
      case "done":
        return doneTasks;
      default:
        return [];
    }
  };

  const setTasksByDroppableId = (id: string, tasks: Task[]) => {
    switch (id) {
      case "todo":
        setToDoTasks(tasks);
        break;
      case "inprogress":
        setInProgressTasks(tasks);
        break;
      case "done":
        setDoneTasks(tasks);
        break;
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceTasks = Array.from(getTasksByDroppableId(source.droppableId));
    const [movedTask] = sourceTasks.splice(source.index, 1);

    const destTasks = Array.from(
      getTasksByDroppableId(destination.droppableId)
    );
    destTasks.splice(destination.index, 0, movedTask);

    setTasksByDroppableId(source.droppableId, sourceTasks);
    setTasksByDroppableId(destination.droppableId, destTasks);

    axios
      .put(`http://127.0.0.1:8080/api/v1/tasks/updateStatus/${movedTask.id}`, {
        status: statusMap[destination.droppableId],
      })
      .catch((err) => console.error(err));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className={styles.board}>
        {[
          { id: "todo", title: "To do", tasks: toDoTasks },
          { id: "inprogress", title: "In progress", tasks: inProgressTasks },
          { id: "done", title: "Done", tasks: doneTasks },
        ].map((col) => (
          <section key={col.id} className={styles.column}>
            <h2 className={styles.title}>{col.title}</h2>
            <Droppable droppableId={col.id}>
              {(provided) => (
                <div
                  className={styles.tasks}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {col.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard id={task.id} title={task.title} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </section>
        ))}
      </main>
    </DragDropContext>
  );
};

export default BoardPage;
