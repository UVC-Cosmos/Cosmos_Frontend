export interface Member {
  id: number;
  username: string;
  email: string;
  role: string;
  position: string;
}

// role은 'normalUser', 'operatorUser', superUser' 중 하나
// position은 '사원', '대리', '과장', '부장' 중 하나
export const dummyMember: Member[] = [
  {
    id: 1,
    username: 'user1',
    email: 'test1@test.com',
    role: 'normalUser',
    position: '사원'
  },
  {
    id: 2,
    username: 'user2',
    email: 'test2@test.com',
    role: 'normalUser',
    position: '대리'
  },
  {
    id: 3,
    username: 'user3',
    email: 'test3@test.com',
    role: 'operatorUser',
    position: '과장'
  },
  {
    id: 4,
    username: 'user4',
    email: 'test4@test.com',
    role: 'superUser',
    position: '부장'
  }
];
