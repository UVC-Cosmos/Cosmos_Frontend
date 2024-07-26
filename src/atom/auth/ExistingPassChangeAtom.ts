// 비밀번호 변경 시 기존 비밀번호 확인을 위한 atom
import { atom } from 'jotai';

export const userPassCheckAtom = atom<boolean>(false);
