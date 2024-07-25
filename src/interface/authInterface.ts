export interface ISigninForm {
  email: string;
  username: string;
  password: string;
  userId: string;
}

export interface IUser {
  id: number;
  userId: string;
  userName: string;
  email: string;
  role: 'Admin' | 'Operator' | 'User';
}

export interface IAuthAtom {
  isLogin: boolean;
  user: IUser | null;
}
