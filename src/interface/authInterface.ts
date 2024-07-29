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
  role: 'Admin' | 'User' | 'A-factoryAdmin' | 'B-factoryAdmin' | 'C-factoryAdmin';
}

export interface IAuthAtom {
  isLogin: boolean;
  user: IUser | null;
}

export interface IFactory {
  id: number;
  name: string;
}

export interface ILine {
  id: number;
  name: string;
}

export interface IMember {
  id: number;
  userName: string;
  rank: string;
  role: string;
  Factories: IFactory[];
  Lines?: ILine[];
  isCheckable?: boolean;
}
