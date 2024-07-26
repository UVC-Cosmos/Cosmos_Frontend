import { DeleteMemberModal } from '@/components/modal/DeleteMemberModal';
import { IMember } from '@/interface/authInterface';
import { useChangeMemberFactoryMutation } from '@/store/mutation/useChangeMemberFactoryMutation';
import { useMemberQuery } from '@/store/query/useMemberQuery';
import React, { useState } from 'react';
import { dummyMember } from '../dummy/dummyMember';

interface IAllMebers extends IMember {
  isCheckable?: boolean;
}
const MemberListPage: React.FC = () => {
  const { isLoading, error, data: allMembers } = useMemberQuery();

  const [members, setMembers] = useState<IAllMebers[]>(
    dummyMember.map((member) => ({ ...member, isCheckable: false }))
  );
  const [, setSearchKeyword] = useState<string>(''); // 검색 키워드 상태 관리
  const [, setIsCheckable] = useState<boolean>(false); // 체크박스 활성화 상태 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 활성화 상태 관리
  const [initialMembers, setInitialMembers] = useState<IAllMebers[]>([]);

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
      setMembers(dummyMember);
    } else {
      // 검색 키워드가 있으면 해당 키워드를 포함하는 멤버 데이터로 업데이트
      const searchedMembers = dummyMember.filter((member) => member.username.includes(value));
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
  const handleFactory = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    factoryName: string
  ) => {
    const { checked } = e.target;
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id
          ? {
              ...member,
              factory: checked
                ? [...member.factory, factoryName].filter(
                    (value, index, self) => self.indexOf(value) === index
                  ) // 중복 제거
                : member.factory.filter((f) => f !== factoryName)
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
      changeUserFactory.mutate({ memberId: id, factory: member.factory });
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
              {/* 권한 변경, 삭제 등 버튼 추가 */}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="hover">
                <td>{member.id}</td>
                <td>{member.username}</td>
                <td>{member.position}</td>
                <td>{member.role}</td>
                <td className="flex flex-row justify-center items-center gap-2">
                  {['공장1', '공장2', '공장3'].map((factoryName) => (
                    <label
                      key={factoryName}
                      className="flex flex-row h-[2rem] items-center justify-center"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-primary"
                        checked={member.factory.includes(factoryName)}
                        disabled={!member.isCheckable}
                        onChange={(e) => handleFactory(e, member.id, factoryName)}
                      />
                      <p className="ml-2">{factoryName}</p>
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
