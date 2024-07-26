import { dummyMember } from '@/dummy/dummyMember';
import { IMember } from '@/interface/authInterface';
import React, { useState } from 'react';

interface IAllMebers extends IMember {
  isCheckable?: boolean;
}
export const PermissionPage: React.FC = () => {
  const [members, setMembers] = useState<IAllMebers[]>(
    dummyMember.map((member) => ({ ...member, isCheckable: false }))
  );

  const [, setSearchKeyword] = useState<string>('');
  // 이름 검색 함수
  // 이름을 검색하면 해당 이름을 포함하는 멤버들만 setMembers로 업데이트
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKeyword(value);
    if (value === '') {
      // 검색 키워드가 없으면 전체 멤버 데이터로 업데이트
      setMembers(dummyMember);
    } else {
      // 검색 키워드가 있으면 해당 키워드를 포함하는 멤버 데이터로 업데이트
      const searchedMembers = dummyMember.filter((member) => member.username.includes(value));
      setMembers(searchedMembers);
    }
  };

  // const handlePermission = (e: React.ChangeEvent<HTMLInputElement>, id: number, role: string) => {
  //   const { checked } = e.target;
  //   setMembers((prevMembers) =>
  //     prevMembers.map((member) =>
  //       member.id === id
  //         ? {
  //             ...member,
  //             role: checked
  //               ? [...member.role, role].filter(
  //                   (value, index, self) => self.indexOf(value) === index
  //                 ) // 중복 제거
  //               : member.role.filter((value) => value !== role)
  //           }
  //         : member
  //     )
  //   );
  // }
  return (
    <div className="w-[90vw] mx-auto mt-4">
      <div className="overflow-x-auto">
        <table className="w-[90vw] table">
          <thead>
            <tr>
              <th className="w-1/12">No</th>
              <th className="w-1/6">이름</th>
              <th className="w-1/6">직급</th>
              <th className="w-1/4">권한</th>
              <th className="w-1/6">소속</th>
              <th className="w-1/12">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="이름을 입력하세요."
                    onChange={handleSearch}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="hover">
                <td>{member.id}</td>
                <td>{member.username}</td>
                <td>{member.position}</td>
                <td>{member.role}</td>
                <td>{member.factory}</td>
                <td>{/* 권한 변경, 삭제 등 버튼 추가 */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
