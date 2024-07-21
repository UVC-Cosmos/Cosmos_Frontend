import { useEffect, useRef, useState } from 'react';
import { apiInstance } from '../../api/api';

interface IProps {
  toggleModal: () => void;
}
const EmailValidationModal = ({ toggleModal }: IProps): JSX.Element => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [code, setCode] = useState<string>('');

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

  // 인증 코드 입력 시 state 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  // 인증 버튼 함수
  const handleVerification = async () => {
    try {
      // const response = await apiInstance
      //   .post('/auth/verify-email', {
      //     code
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //     // 모달 닫기.

      //   });
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-[100] flex size-full flex-col items-center justify-center bg-black bg-opacity-70">
      <div ref={modalRef} className="flex h-[30rem] w-[52rem] flex-col items-center bg-white">
        <div
          id="current-password"
          className="flex h-24 w-[40rem] flex-row items-center justify-center"
        >
          <p className="mr-4 w-36 text-right text-lg">인증코드</p>
          <input
            type="text"
            placeholder="인증코드를 입력하세요."
            value={code}
            onChange={handleChange}
          />
        </div>
        <button aria-label="verify-email-button" onClick={handleVerification}>
          인증
        </button>
      </div>
    </div>
  );
};

export default EmailValidationModal;
