import { atomWithStorage } from 'jotai/utils';
import { IAuthAtom } from '../../interface/authInterface';

export const isLoginAtom = atomWithStorage<boolean>('isLogin', false);

export const userAtom = atomWithStorage<IAuthAtom['user']>('user', null);
