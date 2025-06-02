import { useEffect } from "react";
import type { Task } from "../../Context/Todo/TodoContext";


type UseTodoKeyboardShortcutsProps = {
  allTasks: Task[];
  formik: any;
  id: string | undefined;
  updateTask: (todoId: string, taskId: string, text: string, completed: boolean) => Promise<void>;
  deleteTask: (todoId: string, taskId: string) => Promise<void>;
  setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  setEditedText: React.Dispatch<React.SetStateAction<string>>;
  selectedTaskIndex: number | null;
  setSelectedTaskIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export const useTodoKeyboardShortcuts = ({
  allTasks,
  formik,
  id,
  updateTask,
  deleteTask,
  setEditingTaskId,
  setEditedText,
  selectedTaskIndex,
  setSelectedTaskIndex,
}: UseTodoKeyboardShortcutsProps) => {



  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const activeElement = document.activeElement;
        
        const isTyping = activeElement?.tagName === "INPUT" || activeElement?.tagName === "TEXTAREA";
          
          if (e.ctrlKey) {
            if (e.key === "M" || e.key === "m") {
              e.preventDefault();
              formik.handleSubmit();
              return;
            }
          }

          if (isTyping) return;

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedTaskIndex((prev) => {
            if (allTasks.length === 0) return null;
            
            if (prev === null || prev >= allTasks.length - 1) {
            return 0; 
            }
            return prev + 1;
            });
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedTaskIndex((prev) => {
              if (allTasks.length === 0) return null;

              if (prev === null || prev <= 0) {
              return allTasks.length - 1; 
              }
              return prev - 1;
            });
          }

          if (e.key === " " && selectedTaskIndex !== null) {
            e.preventDefault();
            const task = allTasks[selectedTaskIndex];
            if (id) updateTask(id, task._id, task.text, !task.completed);
          }

          if ((e.key === "e" || e.key === "Enter") && selectedTaskIndex !== null) {
            e.preventDefault();
            const task = allTasks[selectedTaskIndex];
            if (!task.completed) {
              setEditingTaskId(task._id);
              setEditedText(task.text);
            }
          }

          if ((e.key === "Delete") && selectedTaskIndex !== null) {
            e.preventDefault();
            const task = allTasks[selectedTaskIndex];
            if (id) deleteTask(id, task._id);
          }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false }); 
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    allTasks,
    selectedTaskIndex,
    formik,
    id,
    updateTask,
    deleteTask,
    setEditingTaskId,
    setEditedText,
    setSelectedTaskIndex,
  ]);
};
