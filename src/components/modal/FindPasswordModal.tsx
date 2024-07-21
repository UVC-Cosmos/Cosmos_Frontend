import { useEffect, useRef } from 'react';
interface IProps {
  toggleModal: () => void;
}
const FindPasswordModal = ({ toggleModal }: IProps): JSX.Element => {
  const modalRef = useRef<HTMLElement | null>(null);

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

  return <div>모달임동.</div>;
};

export default FindPasswordModal;
