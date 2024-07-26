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
  role: 'Admin' | 'User' | 'A-FactoryAdmin' | 'B-FactoryAdmin' | 'C-FactoryAdmin';
}

export interface IAuthAtom {
  isLogin: boolean;
  user: IUser | null;
}

export interface IMember {
  id: number;
  username: string;
  position: string;
  role: string;
  factory: string[];
}
