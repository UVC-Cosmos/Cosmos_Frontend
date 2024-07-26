export interface IMember {
  id: number;
  username: string;
  position: string;
  role: string;
  factory: string[];
}

// role은 'normalUser', 'operatorUser', superUser' 중 하나
// position은 '사원', '대리', '과장', '부장' 중 하나
export const dummyMember: IMember[] = [
  {
    id: 1,
    username: '김철수',
    position: '사원',
    role: 'normalUser',
    factory: ['공장1', '공장2']
  },
  {
    id: 2,
    username: '이영희',
    position: '대리',
    role: 'normalUser',
    factory: ['공장1']
  },
  {
    id: 3,
    username: '박민수',
    position: '과장',
    role: 'operatorUser',
    factory: ['공장2']
  },
  {
    id: 4,
    username: '최영수',
    position: '부장',
    role: 'superUser',
    factory: ['공장1', '공장2']
  },
  {
    id: 5,
    username: '김철수',
    position: '과장',
    role: 'normalUser',
    factory: ['공장1']
  },
  {
    id: 6,
    username: '이영후',
    position: '부장',
    role: 'normalUser',
    factory: ['공장2']
  },
  {
    id: 7,
    username: '박민수',
    position: '사원',
    role: 'operatorUser',
    factory: ['공장1']
  },
  {
    id: 8,
    username: '최창수',
    position: '대리',
    role: 'superUser',
    factory: ['공장1', '공장2', '공장3']
  }
];
