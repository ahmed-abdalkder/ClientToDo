
import axios from './axios';

export const getTasksByTodoId = async (todoId: string) => {
  const response = await axios.get(`/api/todos/${todoId}/tasks`);
  return response.data;
};
