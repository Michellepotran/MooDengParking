import axios from "axios";

const API_BASE_URL = "https://675f9d801f7ad2426998c553.mockapi.io";
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getParkingHistory = async () => {
  try {
    const response = await api.get("/parkinghistory");
    return response.data;
  } catch (error) {
    console.error("error in fetching data: ", error);
    throw error;
  }
};
export const deleteParkingHistory = async (id) => {
  try {
    const response = await api.delete(`/parkinghistory/${id}`);
    return response.data;
  } catch (error) {
    console.error("error in deleting data: ", error);
    throw error;
  }
};
export const createParkingHistory = async (newtask) => {
  try {
    const response = await api.post("/parkinghistory", newtask);
    return response.data;
  } catch (error) {
    console.error("error in creating data: ", error);
    throw error;
  }
};
export const updateParkingHistory = async (id, updatefield) => {
  try {
    const response = await api.put(`/parkinghistory/${id}`, updatefield);
    return response.data;
  } catch (error) {
    console.error("error in updating data: ", error);
    throw error;
  }
};
