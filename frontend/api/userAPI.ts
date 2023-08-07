import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

const createUser = async (data: any) => {
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

const getUser = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      // if (axiosError.response && axiosError.response.status === 409) {
      //   throw new Error('Usuário não encontrado');
      // }
      throw new Error(axiosError.response?.data.message);
    }
    throw error;
  }
};

export const userService = {
  createUser,
  getUser
};
