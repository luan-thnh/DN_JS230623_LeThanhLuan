export interface ITodo {
  uid: string;
  title: string;
  status: boolean;
  createdAt: string;
}

export interface ITodoResponse {
  uid: string;
  title: string;
  status: boolean;
  created_at: string;
}

export interface ITodoState {
  data: Todo[];
  message: string;
  isLoading: boolean;
}
