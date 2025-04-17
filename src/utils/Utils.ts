import { Task } from "../Types";

export function divideTasksByStatus(tasks: Task[]): Task[][] {
  const toDoTasks: Task[] = [];
  const inProgressTasks: Task[] = [];
  const doneTasks: Task[] = [];

  tasks.forEach((task) => {
    if (task.status === "InProgress") {
      inProgressTasks.push(task);
    } else if (task.status === "Backlog") {
      toDoTasks.push(task);
    } else {
      doneTasks.push(task);
    }
  });

  return [toDoTasks, inProgressTasks, doneTasks];
}
