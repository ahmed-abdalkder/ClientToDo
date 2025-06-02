 import React from "react";
import { useContext, useEffect, useState } from "react";
import {
  TodoContext,
  type Task,
  type TodoContextType,
} from "../../Context/Todo/TodoContext";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTodoKeyboardShortcuts } from "../KeyShortcuts/KeyShortcuts";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTask from "../SortableTasks/SortableTasks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

const TodoDetails = () => {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const {
    addTask,
    updateTask,
    deleteTask,
    getTasks,
    allTasks,
    completedTasksPercentages,
  } = useContext<TodoContextType>(TodoContext);

  const percentage = id ? completedTasksPercentages[id] : 0;

  const formik = useFormik({
    initialValues: { text: "", date: null },
    validationSchema: Yup.object({
      text: Yup.string().required(t("pleaseEnterATask")),
         date: Yup.date()
    .required(t('dateRequired'))  
    .typeError(t('invalidDate')),
    }),
    onSubmit: async (values) => {
      await addTask(id, values.text, values.date || undefined);
      formik.resetForm();
      setSelectedDate(null);
    },
  });

  useEffect(() => {
    if (id) getTasks(id);
  }, [id]);

  useEffect(() => {
    setTasks(allTasks);
  }, [allTasks]);

  useTodoKeyboardShortcuts({
    allTasks: tasks,
    formik,
    id,
    updateTask,
    deleteTask,
    setEditingTaskId,
    setEditedText,
    selectedTaskIndex,
    setSelectedTaskIndex,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t._id === active.id);
    const newIndex = tasks.findIndex((t) => t._id === over.id);
    const reordered = arrayMove(tasks, oldIndex, newIndex);
    setTasks(reordered);
    setActiveTask(null);
  };

  return (
   <div className="mb-10" onClick={() => setSelectedTaskIndex(null)}>
  {/* task input */}
 <form onSubmit={formik.handleSubmit} className="mt-6">
  <div className="w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
    {/* Text Input */}
    <input
      type="text"
      name="text"
      value={formik.values.text}
      onChange={formik.handleChange}
      className="border border-gray-300 text-gray-900 text-sm rounded-2xl sm:rounded-l-2xl block w-full p-4 sm:p-5 focus:border focus:border-sky-400 focus:outline-0"
      placeholder={t("writeATask")}
      onClick={(e) => e.stopPropagation()}
    />

    {/* Date + Add Button Container */}
    <div className="flex w-full sm:w-auto items-center gap-2">
      {/* Date Picker with Icon */}
      <div className="relative w-full">
        <i className="fa-regular fa-calendar-days absolute top-3 left-3 text-gray-400 text-xl z-10 pointer-events-none"></i>
        <DatePicker
          selected={formik.values.date ? new Date(formik.values.date) : null}
          onChange={(date: Date | null) => formik.setFieldValue("date", date)}
          placeholderText={t("selectDueDateAndTime")}
          showTimeSelect
          dateFormat="Pp"
          className="pl-10 pr-3 py-3 rounded-2xl border border-gray-300 w-full text-sm"
        />
        {formik.touched.date && formik.errors.date && (
  <div className="text-red-600 text-sm">{formik.errors.date}</div>
)}
      </div>

      {/* Submit Button */}
      <button type="submit" className="cursor-pointer">
        <i className="fa-solid fa-square-plus text-sky-400 text-4xl sm:text-7xl"></i>
      </button>
    </div>
  </div>

  {/* Error message */}
  {formik.touched.text && formik.errors.text && (
    <div className="mb-4 text-sm text-red-800 rounded-lg" role="alert">
      {formik.errors.text}
    </div>
  )}
</form>


  {/* header */}
  <div className="my-6 flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 px-4 gap-4 bg-gray-100 shadow-lg rounded-xl">
    <p className="text-2xl sm:text-4xl font-semibold">
      <i className="fa-solid fa-list-check text-sky-400 mr-3"></i> {t("allTasks")}
    </p>

    <div className="w-full sm:w-1/3 bg-gray-300 rounded-full h-5">
      <div
        className={`${
          percentage ? "bg-sky-400" : ""
        } text-xs font-medium text-white text-center h-5 leading-5 rounded-full`}
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  </div>

  {/* drag tasks */}
  <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
    onDragStart={({ active }) => {
      const found = tasks.find((t) => t._id === active.id);
      if (found) setActiveTask(found);
    }}
  >
    <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
      {tasks.map((task, index) => (
        <SortableTask
          key={task._id}
          task={task}
          index={index}
          isEditing={editingTaskId === task._id}
          isSelected={selectedTaskIndex === index}
          editedText={editedText}
          setEditedText={setEditedText}
          setEditingTaskId={setEditingTaskId}
          updateTask={updateTask}
          deleteTask={deleteTask}
          id={id}
          setSelectedTaskIndex={setSelectedTaskIndex}
        />
      ))}
    </SortableContext>

    <DragOverlay>
      {activeTask && (
        <div className="flex items-center justify-between bg-white shadow-2xl px-6 py-4 mb-4 rounded-3xl text-lg sm:text-xl scale-105 ring-2 ring-sky-400">
          <p>
            <i className="fa-solid fa-sort mr-2 text-sky-500"></i> {activeTask.text}
          </p>
          {activeTask.date && (
            <span className="text-sm text-gray-500">
              {new Date(activeTask.date).toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </DragOverlay>
  </DndContext>
</div>

  );
};

export default TodoDetails;

 