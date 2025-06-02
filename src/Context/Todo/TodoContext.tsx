 
import React from "react";
import { createContext, useContext, useState, type ReactNode } from 'react';
import axios from '../../api/axios';  
import { AuthContext } from '../Auth/AuthContext';

export type Task = {
  _id: string;
  text: string;
  completed: boolean;
  date?: Date;
};

export type Todo = {
  user: string;
  title: string;
  image: string;
  tasks: Task[];
  _id: string;
};
interface TasK {
  completed: boolean;
  text: string;
  date: string | null;
}

export type TodoContextType = {
  addTask: (id: string, text: string, date?: Date) => Promise<void>;
  updateTask: (id: string, taskId: string, text: string, completed: boolean) => Promise<void>;
  deleteTask: (id: string, taskId: string) => Promise<void>;
  getTasks: (id: string) => Promise<void>;
  completedTasksPercentages: CompletedPercentages;
  setCompletedTasksPercentages: React.Dispatch<React.SetStateAction<CompletedPercentages>>;
  allTasks: Task[];
};

type CompletedPercentages = {
  [todoId: string]: number;
};

export const TodoContext = createContext<TodoContextType>({
  addTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  getTasks: async () => {},
  completedTasksPercentages: {},
  setCompletedTasksPercentages: () => {},
  allTasks: [],
});

type Props = {
  children: ReactNode;
};

const TodoContextProvider = ({ children }: Props) => {
  const { token } = useContext(AuthContext);
  const [completedTasksPercentages, setCompletedTasksPercentages] = useState<CompletedPercentages>({});
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  async function getTasks(id: string) {
    try {
      const { data } = await axios.get(`https://server-to-do-lake.vercel.app/api/todos/${id}/tasks`, {
        headers: { token },  
      });
      const tasks = data;
      setAllTasks(tasks);

      const tasksQty = tasks.length || 1;
      const completedTasks = tasks.filter((task:TasK) => task.completed).length;
      const percentage = Math.round((completedTasks / tasksQty) * 100);
      setCompletedTasksPercentages((prev) => ({ ...prev, [id]: percentage }));
    } catch (err) {
      console.error(err);
    }
  }

  async function addTask(id: string, text: string, date?: Date) {
    try {
      await axios.post(
        `https://server-to-do-lake.vercel.app/api/todos/${id}/task`,
        { text, date: date ? date.toISOString() : null },
        { headers: { token } }
      );
      await getTasks(id);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateTask(id: string, taskId: string, text: string, completed: boolean) {
    try {
      await axios.put(
        `https://server-to-do-lake.vercel.app/api/todos/${id}/task/${taskId}`,
        { text, completed },
        { headers: { token } }
      );
      await getTasks(id);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteTask(id: string, taskId: string) {
    try {
      await axios.delete(`https://server-to-do-lake.vercel.app/api/todos/${id}/task/${taskId}`, {
        headers: { token },
      });
      await getTasks(id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <TodoContext.Provider
      value={{
        addTask,
        updateTask,
        deleteTask,
        getTasks,
        completedTasksPercentages,
        setCompletedTasksPercentages,
        allTasks,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
