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

  // 이름에 대한 오름차순 및 내림차순 정렬 함수
  // 내림 차순과 오츰 차순에 따라 setMembers를 통해 members 상태를 변경
  const sortMembers = () => {
    const newSortOption = sortOption === 'asc' ? 'desc' : 'asc';
    setSortOption(newSortOption);
    setMembers((prev) =>
      prev.sort((a, b) =>
        newSortOption === 'asc'
          ? a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username)
      )
    );
  };

  return (
    <div className="w-[90vw] mx-auto mt-4">
      <div className="overflow-x-auto">
        <table className="w-[90vw] table">
          <thead>
            <tr>
              <th className="w-1/12">No</th>
              <th className="w-1/6" onClick={sortMembers}>
                이름
                {sortOption === 'asc' ? ' ▲' : ' ▼'}
              </th>
              <th className="w-1/6">직급</th>
              <th className="w-1/4">권한</th>
              <th className="w-1/6">소속</th>
              <th className="w-1/12">관리</th>
              {/* 권한 변경, 삭제 등 버튼 추가 */}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="hover">
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
    </div>
  );
};

export default MemberListPage;
