import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/vacations`;

const createVacation = async (data: any, token: any) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.message);
    }
    throw error;
  }
};

const getVacations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.message);
    }
    throw error;
  }
};

const editVacation = async (id: number, data: any, token: string) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.message);
    }
    throw error;
  }
};

const deleteVacation = async (id: number, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data.message);
    }
    throw error;
  }
};

export const vacationService = {
  createVacation,
  getVacations,
  editVacation,
  deleteVacation
};