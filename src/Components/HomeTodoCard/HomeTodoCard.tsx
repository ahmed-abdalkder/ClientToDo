//  import React from 'react';

// import { Link } from "react-router-dom";
// import { TodoContext } from "../../Context/Todo/TodoContext";
// import { useContext, useEffect } from "react";
 
// const stickyNoteColors = [
//     "bg-yellow-200/70",
//     "bg-pink-200/80",
//     "bg-green-200/80",
//     "bg-blue-200/80",
//     "bg-purple-200/80",
//     "bg-indigo-200/60",
//     "bg-orange-200/80",
//     "bg-lime-200/80"
//   ];

//   type TodoCardProps = {
//     id: string
//     title: string;
//     colorIndex: number;
//     imageSrc:string;
//     removeTodo: (id: string) => void;
//   };
  
//   const HomeTodoCard = ({ title, imageSrc, colorIndex, id, removeTodo }: TodoCardProps) => {

//    const { completedTasksPercentages, getTasks } = useContext(TodoContext);

//    const percentage = id ? completedTasksPercentages[id] : 0;

//   const bgColor = stickyNoteColors[colorIndex % stickyNoteColors.length];


// useEffect(() => {
//     getTasks(id);
// }, [id]);

//   return (
//      <div className={`relative p-3 rounded-md shadow-md ${bgColor} text-slate-900`}>
//   <Link to={`/tododetails/${id}`} className="block">
//     {/* العنوان والصورة */}
//     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
//       <div className="flex items-center gap-3">
//         <img src={imageSrc} alt="todo image" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover" />
//         <h2 className="font-bold text-base sm:text-lg">{title}</h2>
//       </div>
//     </div>

//     {/* شريط التقدم */}
//     <div className="w-full bg-gray-300 rounded-full">
//       <div
//         className={`${percentage ? "bg-sky-400" : ""} text-xs font-medium text-white text-center py-1 px-2 leading-none rounded-full`}
//         style={{ width: `${percentage}%` }}
//       >
//         {percentage}%
//       </div>
//     </div>
//   </Link>

//   {/* زر الحذف */}
//   <i
//     onClick={() => removeTodo(id)}
//     className="absolute top-3 end-3 cursor-pointer hover:text-red-700 transition-colors duration-300 text-lg sm:text-xl text-gray-500 fa-solid fa-trash-can"
//   ></i>
// </div>

//   );
// };
  

//   export default HomeTodoCard

import React from 'react';
import { Link } from "react-router-dom";
import { TodoContext } from "../../Context/Todo/TodoContext";
import { useContext, useEffect, useState } from "react";

const modernColors = [
  "from-rose-400 to-pink-500",
  "from-blue-400 to-cyan-500", 
  "from-green-400 to-emerald-500",
  "from-purple-400 to-indigo-500",
  "from-yellow-400 to-orange-500",
  "from-indigo-400 to-purple-500",
  "from-pink-400 to-rose-500",
  "from-cyan-400 to-blue-500"
];

const cardBackgrounds = [
  "bg-gradient-to-br from-rose-50 to-pink-100",
  "bg-gradient-to-br from-blue-50 to-cyan-100",
  "bg-gradient-to-br from-green-50 to-emerald-100", 
  "bg-gradient-to-br from-purple-50 to-indigo-100",
  "bg-gradient-to-br from-yellow-50 to-orange-100",
  "bg-gradient-to-br from-indigo-50 to-purple-100",
  "bg-gradient-to-br from-pink-50 to-rose-100",
  "bg-gradient-to-br from-cyan-50 to-blue-100"
];

type TodoCardProps = {
  id: string;
  title: string;
  colorIndex: number;
  imageSrc: string;
  removeTodo: (id: string) => void;
};

const HomeTodoCard = ({ title, imageSrc, colorIndex, id, removeTodo }: TodoCardProps) => {
  const { completedTasksPercentages, getTasks } = useContext(TodoContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const percentage = id ? completedTasksPercentages[id] : 0;
  
  const gradientColor = modernColors[colorIndex % modernColors.length];
  const bgColor = cardBackgrounds[colorIndex % cardBackgrounds.length];

  useEffect(() => {
    getTasks(id);
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await removeTodo(id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`group relative ${bgColor} rounded-2xl shadow-lg hover:shadow-xl border border-white/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
      {/* Card Content */}
      <Link to={`/tododetails/${id}`} className="block p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <img 
              src={imageSrc} 
              alt="todo" 
              className="w-14 h-14 rounded-xl object-cover shadow-md ring-2 ring-white/50"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iMTIiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8xXzEpIi8+CjxwYXRoIGQ9Ik0yOCAzNkMzMi40MTgzIDM2IDM2IDMyLjQxODMgMzYgMjhDMzYgMjMuNTgxNyAzMi40MTgzIDIwIDI4IDIwQzIzLjU4MTcgMjAgMjAgMjMuNTgxNyAyMCAyOEMyMCAzMi40MTgzIDIzLjU4MTcgMzYgMjggMzZaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQwX2xpbmVhcl8xXzEiIHgxPSIwIiB5MT0iMCIgeDI9IjU2IiB5Mj0iNTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzk5RjZFNCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2MzY2RjEiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';
              }}
            />
            <div className={`absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r ${gradientColor} rounded-full flex items-center justify-center shadow-lg`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-slate-800 truncate group-hover:text-slate-900 transition-colors duration-200">
              {title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {percentage === 100 ? 'Completed!' : `${percentage}% complete`}
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Progress</span>
            <span className={`font-bold ${percentage === 100 ? 'text-green-600' : 'text-slate-700'}`}>
              {percentage}%
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-white/60 rounded-full h-3 shadow-inner">
              <div
                className={`h-3 rounded-full transition-all duration-500 ease-out shadow-sm ${
                  percentage > 0 ? `bg-gradient-to-r ${gradientColor}` : ''
                }`}
                style={{ width: `${percentage}%` }}
              >
                {percentage > 0 && (
                  <div className="absolute right-0 top-0 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-4 flex items-center gap-2">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            percentage === 100 
              ? 'bg-green-100 text-green-700' 
              : percentage > 0 
              ? 'bg-blue-100 text-blue-700'
              : 'bg-slate-100 text-slate-600'
          }`}>
            {percentage === 100 ? (
              <>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Complete
              </>
            ) : percentage > 0 ? (
              <>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                In Progress
              </>
            ) : (
              <>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Not Started
              </>
            )}
          </div>
        </div>
      </Link>

      {/* Delete Button */}
      <div className="absolute top-4 end-4">
        {showDeleteConfirm ? (
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-lg">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-8 h-8 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white rounded-md flex items-center justify-center transition-colors duration-200"
            >
              {isDeleting ? (
                <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="w-8 h-8 bg-slate-400 hover:bg-slate-500 text-white rounded-md flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-10 h-10 bg-white/80 hover:bg-white/90 backdrop-blur-sm text-slate-600 hover:text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
      
      {/* Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
};

export default HomeTodoCard;