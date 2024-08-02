import { useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { apiInstance } from '../../api/api';
import { emailCheckAtom } from '../../atom/auth/signupAtom';

interface IProps {
  toggleModal: () => void;
  checkEmail: string;
  emailCheckClick: () => void;
}
const EmailValidationModal = ({
  toggleModal,
  checkEmail,
  emailCheckClick
}: IProps): JSX.Element => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [code, setCode] = useState<string>('');
  const setIsEmailCheck = useSetAtom(emailCheckAtom);

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
      await apiInstance
        .post('/auth/verify-emailCode', {
          email: checkEmail,
          code: code
        })
        .then((res) => {
          if (res.status === 200) {
            setIsEmailCheck(true);
            emailCheckClick();
          }
          // 모달 닫기.
          toggleModal();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-[100] flex size-full flex-col items-center justify-center bg-black bg-opacity-70">
      <div ref={modalRef} className="flex h-[25%] w-[75%] flex-col items-center bg-white">
        <div className="flex h-[100%] w-[40rem] flex-col items-center justify-center gap-8">
          <label className="input input-bordered flex items-center gap-2">
            인증코드
            <input
              type="text"
              className="grow"
              placeholder="인증 코드를 입력하세요."
              value={code}
              onChange={handleChange}
            />
          </label>
          <button aria-label="verify-email-button" className="btn" onClick={handleVerification}>
            인증
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailValidationModal;
