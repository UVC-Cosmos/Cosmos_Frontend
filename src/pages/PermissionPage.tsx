import { dummyMember } from '@/dummy/dummyMember';
import { ILine, IMember, IUser } from '@/interface/authInterface';
import { useChangeMemberPermissionMutation } from '@/store/mutation/useChangeMemberPermissionMutation';
import { useMemberByFactoryQuery } from '@/store/query/useMemberByFactoryQuery';
import { useMemberQuery } from '@/store/query/useMemberQuery';
import React, { useEffect, useState } from 'react';

export const PermissionPage: React.FC = () => {
  const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
  const factoryRoleArr = ['A-factoryAdmin', 'B-factoryAdmin', 'C-factoryAdmin'];
  const factoryId = factoryRoleArr.findIndex((role) => role === user.role) + 1;

  const { isLoading, data: factoryMembers } = useMemberByFactoryQuery(factoryId);

  const [members, setMembers] = useState<IMember[]>(
    factoryMembers ? factoryMembers.map((member) => ({ ...member, isCheckable: false })) : []
  );

  // 라인 리스트 상수 정의
  // factoryId에 따라 다른 라인 리스트를 보여줘야 함
  // 1 공장의 경우, 1호기, 2호기, 3호기, 센서1, 센서2
  // 2 공장의 경우, 1호기, 2호기, 3호기
  // 3 공장의 경우, 1호기, 2호기, 3호기
  // lineList라는 변수에는 PermissionPage에 접근했을 때, factoryId에 따라 다른 라인 리스트를 보여주기 위해 사용
  const lineList1 = [
    { id: 1, name: '1호기' },
    { id: 2, name: '2호기' },
    { id: 3, name: '3호기' },
    { id: 4, name: '센서1' },
    { id: 5, name: '센서2' }
  ];
  const lineList2 = [
    { id: 1, name: '1호기' },
    { id: 2, name: '2호기' },
    { id: 3, name: '3호기' }
  ];
  const lineList3 = [
    { id: 1, name: '1호기' },
    { id: 2, name: '2호기' },
    { id: 3, name: '3호기' }
  ];

  const lineListsByFactoryId = [lineList1, lineList2, lineList3];
  const lineList = lineListsByFactoryId[factoryId - 1] || [];

  console.log(lineList, '라인리스트');

  useEffect(() => {
    if (factoryMembers) {
      setMembers(
        factoryMembers.map((member) => ({
          ...member,
          isCheckable: false,
          Lines: member.Lines || [] // line 초기값 설정
        }))
      );
    }
  }, [factoryMembers]);

  const [, setSearchKeyword] = useState<string>(''); // 검색 키워드 상태 관리
  const [, setIsCheckable] = useState<boolean>(false); // 체크박스 활성화 상태 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 활성화 상태 관리
  const [initialMembers, setInitialMembers] = useState<IMember[]>([]);
  // 이름 검색 함수
  // 이름을 검색하면 해당 이름을 포함하는 멤버들만 setMembers로 업데이트
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKeyword(value);
    if (value === '') {
      // 검색 키워드가 없으면 전체 멤버 데이터로 업데이트
      setMembers(factoryMembers!);
    } else {
      // 검색 키워드가 있으면 해당 키워드를 포함하는 멤버 데이터로 업데이트
      const searchedMembers = factoryMembers!.filter((member) => member.userName.includes(value));
      setMembers(searchedMembers);
    }
  };

  const toggleMemberCheckable = (id: number) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, isCheckable: !member.isCheckable } : member
      )
    );
  };

  const handlePermission = (e: React.ChangeEvent<HTMLInputElement>, id: number, line: ILine) => {
    const { checked } = e.target;
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id
          ? {
              ...member,
              Lines: checked
                ? [...(member.Lines ?? []), line].filter(
                    (value, index, self) => self.findIndex((l) => l.id === value.id) === index
                  ) // 중복 제거
                : member.Lines?.filter((l) => l.id !== line.id) ?? []
            }
          : member
      )
    );
  };

  // 관리 버튼 함수
  const changeUserPermission = useChangeMemberPermissionMutation();

  const handleEditMember = (id: number) => {
    const member = members.find((member) => member.id === id);
    if (member) {
      const lines = member.Lines?.map((line) => line.name) ?? [];
      changeUserPermission.mutate({ memberId: id, lines });
    }
    setIsCheckable(false);
  };

  const handleManageMember = (id: number) => {
    setInitialMembers(members); // 현재 상태 저장
    toggleMemberCheckable(id);
  };

  const handleCancelEdit = () => {
    setMembers(initialMembers); // 초기 상태로 복구
    setIsCheckable(false);
  };

  if (isLoading)
    return (
      <div className="w-[90vw] mx-auto mt-4">
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </div>
    );

  return (
    <div className="w-[90vw] mx-auto mt-4">
      <div className="overflow-x-auto">
        <table className="w-[90vw] table">
          <thead>
            <tr>
              <th className="w-1/12">No</th>
              <th className="w-1/6">이름</th>
              <th className="w-1/6">직급</th>
              <th className="w-1/3">권한</th>
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
            {members.map((member, idx) => (
              <tr key={member.id} className="hover">
                <td>{idx + 1}</td>
                <td>{member.userName}</td>
                <td>{member.rank}</td>
                <td className="flex flex-row items-center gap-2">
                  {lineList.map((line) => (
                    <label key={line.id} className="flex flex-row h-[2rem] items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-primary"
                        checked={member.Lines && member.Lines.some((l) => l.id === line.id)}
                        disabled={!member.isCheckable}
                        onChange={(e) =>
                          handlePermission(e, member.id, {
                            id: line.id,
                            name: line.name
                          })
                        }
                      />
                      <p className="ml-2 text-[0.7rem]">{line.name}</p>
                    </label>
                  ))}
                </td>
                <td>
                  {member.isCheckable ? (
                    <div className="flex flex-row gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleEditMember(member.id)}
                      >
                        저장
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleCancelEdit()}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => handleManageMember(member.id)}
                    >
                      관리
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
