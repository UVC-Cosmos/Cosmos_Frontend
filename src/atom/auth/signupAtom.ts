// jotai 로 관리할 ID 중복 검사 상태와 이메일 인증 상태를 관리하는 atom 을 생성합니다.

import { atom } from 'jotai';

export const userIdCheckAtom = atom<boolean>(false);
export const emailCheckAtom = atom<boolean>(false);
