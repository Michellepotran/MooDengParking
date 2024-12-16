import axios from "axios";

const API_BASE_URL = "https://675f9d801f7ad2426998c553.mockapi.io";
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getFavorites = async () => {
  try {
    const response = await api.get("/favorites");
    console.log("response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("error in fetching data: ", error);
    throw error;
  }
};
export const deleteFavorites = async (id) => {
  try {
    const response = await api.delete(`/favorites/${id}`);
    return response.data;
  } catch (error) {
    console.error("error in deleting data: ", error);
    throw error;
  }
};
export const createFavorites = async (newtask) => {
  try {
    const response = await api.post("/favorites", newtask);
    return response.data;
  } catch (error) {
    console.error("error in creating data: ", error);
    throw error;
  }
};
export const updateFavorites = async (id, updatefield) => {
  try {
    const response = await api.put(`/favorites/${id}`, updatefield);
    return response.data;
  } catch (error) {
    console.error("error in updating data: ", error);
    throw error;
  }
};
