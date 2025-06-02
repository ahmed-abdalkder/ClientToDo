import React from 'react';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HomeModal from "../HomeModal/HomeModal";
import HomeTodoCard from "../HomeTodoCard/HomeTodoCard";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth/AuthContext";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import NotFound from "../NotFound/NotFound";
import { useTranslation } from 'react-i18next';

interface Todo {
  _id: string;
  title: string;
  image?: {
    secure_url?: string;
  };
}
const Home = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  // get todos
  const { data: todosResponse, isLoading: todosDataLoading, isError: todosError } = useQuery({
    queryKey: ["allTodos"],
    queryFn: async () => {
      const res = await axios.get("https://server-to-do-lake.vercel.app/api/todos/gettodos", {
        headers: { token },
      }) 
      return res.data;
    },
  });

  // Add Todo
  const addTodoMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await axios.post("https://server-to-do-lake.vercel.app/api/todos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTodos'] });
    },
  });

  const handleAddTodo = async (formData: FormData) => {
    await addTodoMutation.mutateAsync(formData);
  };

  // Search Todo 
  const { data: searchResponse, isError: searchTodoError } = useQuery({
    queryKey: ["findTodo", searchTerm],
    queryFn: async () => {
      const res = await axios.get(`https://server-to-do-lake.vercel.app/api/todos/gettodo/${searchTerm}`, {
        headers: { token },
      });
      return res.data;
    },
    enabled: !!searchTerm,
  });

  // Remove Todo
  const removeTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`https://server-to-do-lake.vercel.app/api/todos/${id}/task`, {
        headers: { token },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTodos'] });
    },
  });

  const removeTodo = async (id: string) => {
    await removeTodoMutation.mutateAsync(id);
  };

  if (todosDataLoading) {
    return (
      <div className='container row h-screen justify-center items-center text-3xl'>
        <ClimbingBoxLoader color="#0aad0a" />
      </div>
    );
  }

  if (todosError || searchTodoError) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return (
   <div>
  <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center">
    {/* search */}
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <svg
          className="h-4 w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="search"
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-0"
        placeholder={t('searchTodos')}
      />
    </div>

    {/* Add Todo Button */}
    <div className="w-full sm:w-auto">
      <HomeModal handleAddTodo={handleAddTodo} />
    </div>
  </div>

  {/* Todos Grid */}
  <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
    {searchTerm && searchResponse ? (
      <HomeTodoCard
        key={searchResponse._id}
        title={searchResponse.title}
        imageSrc={searchResponse.image}
        colorIndex={0}
        id={searchResponse._id}
        removeTodo={removeTodo}
      />
    ) : (
      todosResponse?.map((todo: Todo, index: number) => (
        <HomeTodoCard
          key={todo._id}
          title={todo.title}
          imageSrc={todo.image?.secure_url || ''}
          colorIndex={index}
          id={todo._id}
          removeTodo={removeTodo}
        />
      ))
    )}
  </div>
</div>

  );
};

export default Home;

// import React from 'react';
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import HomeModal from "../HomeModal/HomeModal";
// import HomeTodoCard from "../HomeTodoCard/HomeTodoCard";
// import axios from "axios";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../Context/Auth/AuthContext";
// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// import NotFound from "../NotFound/NotFound";
// import { useTranslation } from 'react-i18next';

// interface Todo {
//   _id: string;
//   title: string;
//   image?: {
//     secure_url?: string;
//   };
// }

// const Home = () => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const { token } = useContext(AuthContext);
//   const [searchTerm, setSearchTerm] = useState("");

//   // get todos
//   const { data: todosResponse, isLoading: todosDataLoading, isError: todosError } = useQuery({
//     queryKey: ["allTodos"],
//     queryFn: async () => {
//       const res = await axios.get("https://server-to-do-two.vercel.app/api/todos/gettodos", {
//         headers: { token },
//       }) 
//       return res.data;
//     },
//   });

//   // Add Todo
//   const addTodoMutation = useMutation({
//     mutationFn: async (formData: FormData) => {
//       return await axios.post("https://server-to-do-two.vercel.app/api/todos", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           token,
//         },
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['allTodos'] });
//     },
//   });

//   const handleAddTodo = async (formData: FormData) => {
//     await addTodoMutation.mutateAsync(formData);
//   };

//   // Search Todo 
//   const { data: searchResponse, isError: searchTodoError } = useQuery({
//     queryKey: ["findTodo", searchTerm],
//     queryFn: async () => {
//       const res = await axios.get(`https://server-to-do-two.vercel.app/api/todos/gettodo/${searchTerm}`, {
//         headers: { token },
//       });
//       return res.data;
//     },
//     enabled: !!searchTerm,
//   });

//   // Remove Todo
//   const removeTodoMutation = useMutation({
//     mutationFn: async (id: string) => {
//       return await axios.delete(`https://server-to-do-two.vercel.app/api/todos/${id}/task`, {
//         headers: { token },
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['allTodos'] });
//     },
//   });

//   const removeTodo = async (id: string) => {
//     await removeTodoMutation.mutateAsync(id);
//   };

//   if (todosDataLoading) {
//     return (
//       <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center'>
//         <div className="flex flex-col items-center gap-4">
//           <ClimbingBoxLoader color="#3b82f6" size={15} />
//           <p className="text-slate-600 font-medium">Loading your todos...</p>
//         </div>
//       </div>
//     );
//   }

//   if (todosError || searchTodoError) {
//     return <NotFound />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
//       <div className="container mx-auto px-4 py-8 max-w-7xl relative">
//         {/* Header Section */}
//         <div className="mb-12 ">
//           <div className="text-center mb-8">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
//               My Todos
//             </h1>
//             <p className="text-slate-600 text-lg">Organize your tasks beautifully</p>
//           </div>

//           {/* Search and Add Section */}
//           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
//             {/* Enhanced Search */}
//             <div className="relative w-full lg:flex-1 max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <input
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 type="search"
//                 className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                 placeholder={t('searchTodos') || "Search your todos..."}
//                 value={searchTerm}
//               />
//               {searchTerm && (
//                 <button
//                   onClick={() => setSearchTerm("")}
//                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
//                 >
//                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               )}
//             </div>

//             {/* Add Todo Button */}
//             <div className="w-full lg:w-auto  ">
//               <HomeModal handleAddTodo={handleAddTodo} />
//             </div>
//           </div>
//         </div>

//         {/* Todos Grid */}
//         <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {searchTerm && searchResponse ? (
//             <HomeTodoCard
//               key={searchResponse._id}
//               title={searchResponse.title}
//               imageSrc={searchResponse.image}
//               colorIndex={0}
//               id={searchResponse._id}
//               removeTodo={removeTodo}
//             />
//           ) : (
//             todosResponse?.map((todo: Todo, index: number) => (
//               <HomeTodoCard
//                 key={todo._id}
//                 title={todo.title}
//                 imageSrc={todo.image?.secure_url || ''}
//                 colorIndex={index}
//                 id={todo._id}
//                 removeTodo={removeTodo}
//               />
//             ))
//           )}
//         </div>

//         {/* Empty State */}
//         {!todosDataLoading && (!todosResponse || todosResponse.length === 0) && !searchTerm && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
//               <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-700 mb-2">No todos yet</h3>
//             <p className="text-slate-500 mb-6">Create your first todo to get started!</p>
//             <HomeModal handleAddTodo={handleAddTodo} />
//           </div>
//         )}

//         {/* Search No Results */}
//         {searchTerm && !searchResponse && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
//               <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-700 mb-2">No results found</h3>
//             <p className="text-slate-500">Try searching with different keywords</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

