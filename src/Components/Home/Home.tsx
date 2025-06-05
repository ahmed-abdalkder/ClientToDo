/**
 * Home Component
 * 
 * This component serves as the main dashboard for the Todo application.
 * It handles the following key responsibilities:
 *  - Fetching and displaying all todos from the backend API.
 *  - Providing a search functionality to find a specific todo by its title.
 *  - Allowing users to add new todos through a modal form.
 *  - Enabling deletion of todos with immediate UI update.
 *  - Managing loading and error states with appropriate feedback components.
 * 
 * It integrates React Query for efficient data fetching and caching,
 * Axios for HTTP requests, and uses AuthContext to access the user token.
 * The component also supports internationalization via react-i18next.
 */

import React, { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import HomeModal from "../HomeModal/HomeModal";
 
import { AuthContext } from "../../Context/Auth/AuthContext";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import NotFound from "../NotFound/NotFound";
import { useTranslation } from 'react-i18next';
import VantaBackground from '../VantaBackground/VantaBackground';
import HomeTodoCard from '../HomeTodoCard/HomeTodoCard';

// Define the structure of a Todo item
interface Todo {
  _id: string;
  title: string;
  image?: {
    secure_url?: string;
  };
}

const Home = () => {
  // Translation hook for multi-language support
  const { t } = useTranslation();

  // React Query client instance for cache invalidation
  const queryClient = useQueryClient();

  // Get authentication token from context for API requests
  const { token } = useContext(AuthContext);

  // State to hold the current search input value
  const [searchTerm, setSearchTerm] = useState("");

  // ============================
  // Fetch all todos from API
  // ============================
  const { data: todosResponse, isLoading: todosDataLoading, isError: todosError } = useQuery({
    queryKey: ["allTodos"],
    queryFn: async () => {
      // Make GET request to fetch all todos with auth token header
      const res = await axios.get("https://server-to-do-lake.vercel.app/api/todos/gettodos", {
        headers: { token },
      });
      return res.data;
    },
  });

  // ============================
  // Mutation to add a new todo
  // ============================
  const addTodoMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // POST request to add todo with form data and token header
      return await axios.post("https://server-to-do-lake.vercel.app/api/todos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });
    },
    // Refresh the todos list after successful addition
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTodos'] });
    },
  });

  // Handler function to trigger add todo mutation
  const handleAddTodo = async (formData: FormData) => {
    await addTodoMutation.mutateAsync(formData);
  };

  // ============================
  // Search for a todo by title
  // ============================
  const { data: searchResponse, isError: searchTodoError } = useQuery({
    queryKey: ["findTodo", searchTerm],
    queryFn: async () => {
      // GET request to find todo by search term, with auth token
      const res = await axios.get(`https://server-to-do-lake.vercel.app/api/todos/gettodo/${searchTerm}`, {
        headers: { token },
      });
      return res.data;
    },
    enabled: !!searchTerm, // Only run query if searchTerm is not empty
  });

  // ============================
  // Mutation to remove a todo by ID
  // ============================
  const removeTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      // DELETE request to remove todo by id with auth token
      return await axios.delete(`https://server-to-do-lake.vercel.app/api/todos/${id}/task`, {
        headers: { token },
      });
    },
    // Refresh todos list after successful removal
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTodos'] });
    },
  });

  // Handler function to trigger remove todo mutation
  const removeTodo = async (id: string) => {
    await removeTodoMutation.mutateAsync(id);
  };

  // ============================
  // Show loader while fetching todos
  // ============================
  if (todosDataLoading) {
    return (
      <div className='container row h-screen justify-center items-center text-3xl'>
        <ClimbingBoxLoader color="#0aad0a" />
      </div>
    );
  }

  // ============================
  // Display error component if fetching or searching fails
  // ============================
  if (todosError || searchTodoError) {
    return <NotFound />;
  }

  // ============================
  // Render main UI
  // ============================
 
  

  return (
  <div>
    {/* Search input and Add Todo modal button */}
    <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center">
      {/* Search box with icon */}
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

      {/* Button to open modal for adding new todo */}
      <div className="w-full sm:w-auto">
        <HomeModal handleAddTodo={handleAddTodo} />
      </div>
    </div>

   <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
  {((searchTerm && !searchResponse) || (!searchTerm && !todosResponse?.length)) ? (
     
    <div className="h-[300px] w-full flex justify-center items-center col-span-full">
      <VantaBackground effect="net" />
    </div>
  ) : searchTerm && searchResponse ? (
    
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
