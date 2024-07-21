import React, { useState, useEffect } from 'react';
import { Member, dummyMember } from '../dummy/dummyMember';

const MemberListPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(dummyMember); // 멤버 데이터 상태 관리
  const [sortOption, setSortOption] = useState<'asc' | 'desc'>('asc'); // 정렬 옵션 상태 관리
  const [filterOption, setFilterOption] = useState<string>(''); // 필터 옵션 상태 관리
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // 검색 키워드 상태 관리

  // 컴포넌트 마운트 시 전체 멤버 데이터 가져오기 (실제 API 연동 필요)
  // useEffect(() => {
  //   // TODO: API 호출하여 실제 멤버 데이터 가져오기
  // }, []);

  // 정렬, 필터링, 검색 로직 구현
  // const sortedMembers = members.sort((a, b) => {
  //   // TODO: 정렬 옵션에 따른 정렬 로직 구현
  // });

  // const filteredMembers = sortedMembers.filter((member) => {
  //   // TODO: 필터 옵션 및 검색 키워드에 따른 필터링 로직 구현
  // });

  return (
    <div>
      <h1>멤버 리스트</h1>

      {/* 검색, 필터링, 정렬 UI */}
      <div>
        <input
          type="text"
          placeholder="이름 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
          <option value="">전체</option>
          <option value="사원">사원</option>
          <option value="대리">대리</option>
          <option value="과장">과장</option>
          <option value="부장">부장</option>
        </select>
        <button onClick={() => setSortOption(sortOption === 'asc' ? 'desc' : 'asc')}>
          {sortOption === 'asc' ? '오름차순' : '내림차순'}
        </button>
      </div>

      {/* 멤버 리스트 테이블 */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>권한</th>
            <th>직급</th>
            <th>관리</th>
            {/* 권한 변경, 삭제 등 버튼 추가 */}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.username}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>{member.position}</td>
              <td>{/* 관리 버튼 */}관리</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberListPage;
