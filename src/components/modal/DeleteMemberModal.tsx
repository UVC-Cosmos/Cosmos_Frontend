import { apiInstance } from '@/api/api';
import { useDeleteMemberMutation } from '@/store/mutation/useDeleteMemberMutation';
import { useEffect, useRef } from 'react';

interface IDeleteMemberModalProps {
  toggleModal: () => void;
  memberId: number;
}

export const DeleteMemberModal = ({
  toggleModal,
  memberId
}: IDeleteMemberModalProps): JSX.Element => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const deleteMember = useDeleteMemberMutation();

  // 모달 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleModal]);

  // 삭제 버튼 함수
  const handleDeleteMember = (memberId: number) => {
    deleteMember.mutate(memberId);
  };
  return (
    <>
      <div className="fixed left-0 top-0 z-[100] flex size-full flex-col items-center justify-center bg-black bg-opacity-70">
        <div ref={modalRef} className="flex h-[30rem] w-[52rem] flex-col items-center bg-white">
          <h1>정말 삭제하시겠습니까?</h1>
          <div className="flex justify-center items-center mt-4">
            <button
              className="w-20 h-10 bg-red-500 text-black rounded-md"
              onClick={() => handleDeleteMember(memberId)}
            >
              확인
            </button>
            <button
              className="w-20 h-10 bg-gray-500 text-black rounded-md ml-4"
              onClick={toggleModal}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
