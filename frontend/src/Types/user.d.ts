export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
  isAdmin?: boolean;
  status?: string;
  token?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  avatar?: string;
}