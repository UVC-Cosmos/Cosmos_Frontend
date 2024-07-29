import { DeleteMemberModal } from '@/components/modal/DeleteMemberModal';
import { IFactory, IMember } from '@/interface/authInterface';
import { useChangeMemberFactoryMutation } from '@/store/mutation/useChangeMemberFactoryMutation';
import { useMemberQuery } from '@/store/query/useMemberQuery';
import React, { useEffect, useState } from 'react';

const MemberListPage: React.FC = () => {
  const { isLoading, data: allMembers } = useMemberQuery();

  const [members, setMembers] = useState<IMember[]>(
    allMembers ? allMembers.map((member) => ({ ...member, isCheckable: false })) : []
  );
  useEffect(() => {
    if (allMembers) {
      setMembers(
        allMembers.map((member) => ({
          ...member,
          isCheckable: false,
          Factories: member.Factories || [] // factory 초기값 설정
        }))
      );
    }
  }, [allMembers]);

  const [, setSearchKeyword] = useState<string>(''); // 검색 키워드 상태 관리
  const [, setIsCheckable] = useState<boolean>(false); // 체크박스 활성화 상태 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 활성화 상태 관리
  const [initialMembers, setInitialMembers] = useState<IMember[]>([]);

  const factoryList = [
    { id: 1, name: 'A공장' },
    { id: 2, name: 'B공장' },
    { id: 3, name: 'C공장' }
  ];
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 이름 검색 함수
  // 이름을 검색하면 해당 이름을 포함하는 멤버들만 setMembers로 업데이트
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKeyword(value);
    if (value === '') {
      // 검색 키워드가 없으면 전체 멤버 데이터로 업데이트
      setMembers(allMembers!);
    } else {
      // 검색 키워드가 있으면 해당 키워드를 포함하는 멤버 데이터로 업데이트
      const searchedMembers = allMembers!.filter((member) => member.userName.includes(value));
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

  // member 데이터 안에 있는 factory 데이터를 checkbox로 표현
  // handleFactory 함수: 체크박스 상태 변경에 따라 직원의 공장 배열을 업데이트하는 함수
  const handleFactory = (e: React.ChangeEvent<HTMLInputElement>, id: number, factory: IFactory) => {
    const { checked } = e.target;
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id
          ? {
              ...member,
              Factories: checked // Factories 속성 업데이트
                ? [...(member.Factories ?? []), factory].filter(
                    // member.Factories 사용
                    (value, index, self) => self.findIndex((f) => f.id === value.id) === index
                  )
                : member.Factories?.filter((f) => f.id !== factory.id) ?? []
            }
          : member
      )
    );
  };

  // 관리 버튼 함수
  const changeUserFactory = useChangeMemberFactoryMutation();

  const handleEditMember = (id: number) => {
    const member = members.find((member) => member.id === id);
    if (member) {
      const factoryArray = member.Factories ? member.Factories.map((f) => f.name) : [];
      changeUserFactory.mutate({ memberId: id, factory: factoryArray });
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
              {/* 권한 변경, 삭제 등 버튼 추가 */}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="hover">
                <td>{member.id}</td>
                <td>{member.userName}</td>
                <td>{member.rank}</td>
                <td className="flex flex-row justify-center items-center gap-2">
                  {factoryList.map((factory) => (
                    <label key={factory.id} className="flex flex-row h-[2rem] items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-primary"
                        checked={
                          member.Factories && member.Factories.some((f) => f.name === factory.name)
                        }
                        disabled={!member.isCheckable}
                        onChange={(e) =>
                          handleFactory(e, member.id, { id: factory.id, name: factory.name })
                        }
                      />
                      <p className="ml-2 text-[0.7rem]">{factory.name}</p>
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
                      <button className="btn btn-sm btn-outline btn-primary" onClick={toggleModal}>
                        삭제
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
                {isModalOpen && (
                  <DeleteMemberModal toggleModal={toggleModal} memberId={member.id} />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberListPage;
