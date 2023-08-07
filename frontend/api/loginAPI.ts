import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/login`;

const login = async (data: any) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response && axiosError.response.status === 401) {
        throw new Error('Usuário ou senha inválidos');
      }
      throw new Error(axiosError.response?.data.message);
    }
    throw error;
  }
};

export const loginService = {
  login,
};
