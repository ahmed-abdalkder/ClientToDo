 
// import React from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { useTranslation } from 'react-i18next';

// import type { Task } from "../../Context/Todo/TodoContext";

// type SortableTaskProps = {
//   task: Task;
//   index: number;
//   isEditing: boolean;
//   isSelected: boolean;
//   editedText: string;
//   setEditedText: (text: string) => void;
//   setEditingTaskId: (id: string | null) => void;
//   updateTask: (id: string, taskId: string, text: string, completed: boolean) => Promise<void>;
//   deleteTask: (id: string, taskId: string) => Promise<void>;
//   id: string;
//   setSelectedTaskIndex: (index: number | null) => void;
// };

// const SortableTask = ({
//   task,
//   index,
//   isEditing,
//   isSelected,
//   editedText,
//   setEditedText,
//   setEditingTaskId,
//   updateTask,
//   deleteTask,
//   id,
//   setSelectedTaskIndex,
// }: SortableTaskProps) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });
//   const { t } = useTranslation();

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const colors = [
//     "bg-red-100",
//     "bg-green-100",
//     "bg-blue-100",
//     "bg-yellow-100",
//     "bg-purple-100",
//     "bg-pink-100",
//     "bg-indigo-100",
//   ];

//   return (
//    <div
//   ref={setNodeRef}
//   style={style}
//   onClick={() => setSelectedTaskIndex(index)}
//   className={`relative w-full sm:w-3/4 mx-auto flex flex-col sm:flex-row items-start sm:items-center shadow-md px-4 sm:px-6 py-3 sm:py-4 mb-4 rounded-2xl text-base sm:text-xl ${
//     task.completed ? "line-through text-gray-500" : ""
//   } ${isSelected ? "ring-2 ring-sky-400" : ""} ${colors[index % colors.length]}`}
// >
//   <span
//     {...attributes}
//     {...listeners}
//     className="cursor-grab text-2xl sm:text-3xl mb-2 sm:mb-0 sm:mr-6"
//     title={t('dragTask', 'Drag task')}
//     onClick={(e) => e.stopPropagation()}
//   >
//     <i className="fa-solid fa-sort text-white bg-sky-500 p-2 sm:p-3 rounded-full shadow-lg"></i>
//   </span>

//   <p className="flex-1 text-left font-semibold text-base sm:text-lg w-full sm:w-auto">
//     {isEditing && !task.completed ? (
//       <input
//         value={editedText}
//         onChange={(e) => setEditedText(e.target.value)}
//         className="bg-white text-base sm:text-lg w-full border border-gray-50 focus:border-blue-500 focus:outline-0 py-2 px-2 rounded-2xl"
//       />
//     ) : (
//       task.text
//     )}
//   </p>

//   {task.date && (
//     <p className="text-gray-700 text-sm sm:text-xl font-semibold mt-3 sm:mt-0 sm:mx-8 text-center whitespace-nowrap flex items-center">
//       <i className="fa-regular fa-calendar mr-2 sm:mr-3"></i>
//       {new Date(task.date).toLocaleString()}
//     </p>
//   )}

//   <div className="flex flex-row sm:flex-col justify-center gap-4 sm:gap-8 mt-3 sm:mt-0 sm:ml-6 text-2xl sm:text-4xl">
//     {isEditing && !task.completed ? (
//       <i
//         className="fa-solid fa-check text-green-600 cursor-pointer"
//         onClick={async () => {
//           await updateTask(id, task._id, editedText, task.completed);
//           setEditingTaskId(null);
//         }}
//         title={t('done', 'Done')}
//       />
//     ) : (
//       <i
//         className="fa-solid fa-pen-to-square text-amber-600 cursor-pointer"
//         onClick={() => {
//           setEditingTaskId(task._id);
//           setEditedText(task.text);
//         }}
//         title={t('editTask', 'Edit Task')}
//       />
//     )}

//     <i
//       className="fa-regular fa-circle-check text-green-600 cursor-pointer"
//       onClick={async () => {
//         await updateTask(id, task._id, task.text, true);
//       }}
//       title={t('markComplete', 'Mark as Complete')}
//     />

//     <i
//       className="fa-solid fa-trash-can text-red-600 cursor-pointer"
//       onClick={async () => {
//         await deleteTask(id, task._id);
//       }}
//       title={t('deleteTask', 'Delete Task')}
//     />
//   </div>
// </div>

//   );
// };

// export default SortableTask;
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslation } from 'react-i18next';
import type { Task } from "../../Context/Todo/TodoContext";

type SortableTaskProps = {
  task: Task;
  index: number;
  isEditing: boolean;
  isSelected: boolean;
  editedText: string;
  setEditedText: (text: string) => void;
  setEditingTaskId: (id: string | null) => void;
  updateTask: (id: string, taskId: string, text: string, completed: boolean) => Promise<void>;
  deleteTask: (id: string, taskId: string) => Promise<void>;
  id: string;
  setSelectedTaskIndex: (index: number | null) => void;
};

const SortableTask = ({
  task,
  index,
  isEditing,
  isSelected,
  editedText,
  setEditedText,
  setEditingTaskId,
  updateTask,
  deleteTask,
  id,
  setSelectedTaskIndex,
}: SortableTaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });
  const { t } = useTranslation();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
     
  };

  const gradients = [
    "from-rose-100 to-pink-100",
    "from-blue-100 to-cyan-100", 
    "from-green-100 to-emerald-100",
    "from-yellow-100 to-orange-100",
    "from-purple-100 to-violet-100",
    "from-indigo-100 to-blue-100",
    "from-teal-100 to-green-100",
  ];

  const accentColors = [
    "border-rose-200 hover:border-rose-300",
    "border-blue-200 hover:border-blue-300",
    "border-green-200 hover:border-green-300", 
    "border-yellow-200 hover:border-yellow-300",
    "border-purple-200 hover:border-purple-300",
    "border-indigo-200 hover:border-indigo-300",
    "border-teal-200 hover:border-teal-300",
  ];

  const iconColors = [
    "text-rose-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500", 
    "text-purple-500",
    "text-indigo-500",
    "text-teal-500",
  ];

  const currentGradient = gradients[index % gradients.length];
  const currentAccent = accentColors[index % accentColors.length];
  const currentIcon = iconColors[index % iconColors.length];

  return (
   
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedTaskIndex(index);
      }}
      className={`
        group relative bg-gradient-to-br ${currentGradient} 
        border-2 ${currentAccent} 
        rounded-3xl shadow-lg hover:shadow-xl 
        transition-all duration-300 transform hover:-translate-y-1 
        ${isSelected ? "ring-4 ring-blue-400 ring-opacity-50 scale-[1.02]" : ""}
        ${task.completed ? "opacity-75" : ""}
        backdrop-blur-sm
        overflow-hidden
      `}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative p-6">
        {/* Task Content */}
        <div className="mb-6">
          {/* Task Text */}
          <div className="mb-4">
            {isEditing && !task.completed ? (
              <input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full px-4 py-3 text-lg font-medium text-gray-800 bg-white/80 border-2 border-white/50 rounded-2xl focus:border-blue-400 focus:bg-white focus:outline-none transition-all duration-300 backdrop-blur-sm"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <p className={`
                text-lg md:text-xl font-semibold leading-relaxed
                ${task.completed 
                  ? "line-through text-gray-500" 
                  : "text-gray-800"
                }
              `}>
                {task.text}
              </p>
            )}
          </div>

          {/* Task Date and Time */}
          {task.date && (
            <div className="flex items-center gap-3 text-gray-600 mb-4">
              {/* Date */}
              <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
                <i className="far fa-calendar-alt mr-2 text-gray-500"></i>
                <span className="text-sm md:text-base font-medium">
                  {new Date(task.date).toLocaleDateString()}
                </span>
              </div>
              
              {/* Time */}
              <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
                <i className="far fa-clock mr-2 text-gray-500"></i>
                <span className="text-sm md:text-base font-medium">
                  {new Date(task.date).toLocaleTimeString()}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start gap-4 md:gap-6">
          
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className={`
              flex-shrink-0 w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-sm 
              flex items-center justify-center cursor-grab active:cursor-grabbing
              hover:bg-white/90 transition-all duration-200 group-hover:scale-110
              shadow-md hover:shadow-lg
            `}
            onClick={(e) => e.stopPropagation()}
            title={t('dragTask', 'Drag task')}
          >
            <i className={`fas fa-grip-vertical ${currentIcon} text-xl`}></i>
          </div>

          <div className="flex-1"></div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 flex flex-col md:flex-row gap-2 md:gap-3">
            
            {/* Edit/Save Button */}
            {isEditing && !task.completed ? (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  await updateTask(id, task._id, editedText, task.completed);
                  setEditingTaskId(null);
                }}
                className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title={t('done', 'Save changes')}
              >
                <i className="fas fa-check text-lg"></i>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingTaskId(task._id);
                  setEditedText(task.text);
                }}
                className="w-12 h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title={t('editTask', 'Edit task')}
              >
                <i className="fas fa-edit text-lg"></i>
              </button>
            )}

            {/* Complete Button */}
            <button
              onClick={async (e) => {
                e.stopPropagation();
                await updateTask(id, task._id, task.text, !task.completed);
              }}
              className={`
                w-12 h-12 rounded-2xl flex items-center justify-center 
                transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl
                ${task.completed 
                  ? "bg-gray-400 hover:bg-gray-500 text-white" 
                  : "bg-green-500 hover:bg-green-600 text-white"
                }
              `}
              title={task.completed ? t('markIncomplete', 'Mark as incomplete') : t('markComplete', 'Mark as complete')}
            >
              <i className={`fas ${task.completed ? 'fa-undo' : 'fa-check-circle'} text-lg`}></i>
            </button>

            {/* Delete Button */}
            <button
              onClick={async (e) => {
                e.stopPropagation();
                if (window.confirm('Are you sure you want to delete this task?')) {
                  await deleteTask(id, task._id);
                }
              }}
              className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
              title={t('deleteTask', 'Delete task')}
            >
              <i className="fas fa-trash-alt text-lg"></i>
            </button>
          </div>
        </div>

        {/* Task Status Indicator */}
        {task.completed && (
          <div className="absolute top-4 right-4">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
              <i className="fas fa-check text-sm"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortableTask;