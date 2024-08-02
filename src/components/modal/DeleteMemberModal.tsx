import { useDeleteMemberMutation } from '@/store/mutation/useDeleteMemberMutation';
import React, { useEffect } from 'react';

interface IDeleteMemberModalProps {
  toggleModal: () => void;
  memberId: number;
}

export const DeleteMemberModal = ({
  toggleModal,
  memberId
}: IDeleteMemberModalProps): JSX.Element => {
  const deleteMember = useDeleteMemberMutation();

  // 모달 삭제 버튼 함수
  const handleDeleteMember = (memberId: number) => {
    deleteMember.mutate(memberId);
    toggleModal(); // 삭제 후 모달 닫기
  };

  useEffect(() => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    modal.showModal();
    return () => {
      modal.close(); // 컴포넌트 언마운트 시 모달 닫기
    };
  }, []);

  return (
    <>
      {/* 모달 열기 버튼은 페이지 외부에서 트리거 */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-mainColor">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
              onClick={toggleModal}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-white">정말 삭제하시겠습니까?</h3>
          <div className="py-4">
            <button className="btn btn-error mr-4" onClick={() => handleDeleteMember(memberId)}>
              확인
            </button>
            <button className="btn" onClick={toggleModal}>
              취소
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
