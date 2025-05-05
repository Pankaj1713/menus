// services/apiService.ts

import axiosInstance from "./axiosInstance";

// GET request
export const getApi = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// POST request
export const postApi = async (endpoint: string, data: object) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// PUT request
export const putApi = async (endpoint: string, data: object) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error putting data:", error);
    throw error;
  }
};

// DELETE request
export const deleteApi = async (endpoint: string) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
