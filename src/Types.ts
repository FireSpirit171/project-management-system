export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

enum TaskPriority {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

enum TaskStatus {
  InProgress = "InProgress",
  Backlog = "Backlog",
  Done = "Done",
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
  boardId: number | null;
  boardName: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  description: string;
  avatarUrl: string;
  teamId: number;
  teamName: string;
  tasksCount: number;
}
