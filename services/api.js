import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * Récupération des todos avec AXIOS
 * Utilisé pour comparaison avec fetch (TP)
 */
export const fetchTodosAxios = async () => {
  const response = await axios.get(`${API_URL}/todos?_limit=10`);
  return response.data;
};

/**
 * Récupération des todos avec FETCH
 * Utilisé dans TodoListFetchScreen
 */
export const fetchTodosFetch = async () => {
  const response = await fetch(`${API_URL}/todos?_limit=10`);

  if (!response.ok) {
    throw new Error("Erreur serveur");
  }

  return response.json();
};
