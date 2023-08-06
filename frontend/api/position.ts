import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

// const API_URL = `${process.env.REACT_APP_API_URL}/position`;
const API_URL = `http://localhost:3001/position`;


const createPosition = async (data: any) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response && axiosError.response.status === 409) {
        throw new Error('Cargo já cadastrado');
      }
      throw new Error(axiosError.response?.data.message);
    }
    throw error;
  }
};

export const positionService = {
  createPosition,
};
