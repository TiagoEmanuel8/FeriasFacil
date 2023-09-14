export interface IPositionFormData {
  position: string;
}

export interface IPositionFormProps {
  isLoading: boolean;
  onSubmit: (data: IPositionFormData) => Promise<void>;
}

export interface IPosition {
  id: string;
  position: string;
}