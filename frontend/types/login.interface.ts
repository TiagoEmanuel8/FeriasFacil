export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  onSubmit: (data: ILoginFormData) => Promise<void>;
  isLoading: boolean;
}