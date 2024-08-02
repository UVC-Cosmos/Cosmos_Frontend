import { useEffect, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import * as Yup from 'yup';
import { apiInstance } from '@/api/api';
import { AxiosError } from 'axios';
import './modal.css';
import './alert.css';

interface ExistingPasswordChangeProps {
  onClose: () => void;
  title: string;
}

const ExistingPasswordChangeModal: React.FC<ExistingPasswordChangeProps> = ({ onClose, title }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const dialogRef = useRef<HTMLDialogElement>(null);
  const newPasswordSectionRef = useRef<HTMLDivElement>(null); // CSSTransition nodeRef로 사용될 ref

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
    const firstInput = document.querySelector('input[name="currentPassword"]');
    if (firstInput) {
      (firstInput as HTMLInputElement).focus();
    }
  }, []);

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('기존의 비밀번호를 입력해주세요.'),
    newPassword: Yup.string()
      .required('새로운 비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .notOneOf([formData.currentPassword], '새 비밀번호는 기존 비밀번호와 달라야 합니다.'),
    confirmPassword: Yup.string()
      .required('새로운 비밀번호를 다시 입력해주세요.')
      .oneOf([Yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.')
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch((err) => setErrors({ ...errors, [name]: err.message }));
  };

  const checkCurrentPassword = async () => {
    if (!formData.currentPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        currentPassword: '기존의 비밀번호를 입력해주세요.'
      }));
      return;
    }
    try {
      const response = await apiInstance.post('/auth/password-check', {
        id: user.id,
        password: formData.currentPassword
      });
      if (response.status === 200) {
        setIsPasswordConfirmed(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        setIsPasswordConfirmed(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          currentPassword: '비밀번호가 일치하지 않습니다.'
        }));
        return;
      } else {
        console.error('비밀번호 확인 중 오류가 발생했습니다.');
      }
    }
  };

  const ExistingPasswordChange = async () => {
    if (!isPasswordConfirmed) {
      alert('먼저 현재 비밀번호를 확인해주세요.');
      return;
    } else if (formData.confirmPassword.length < 7) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    } else if (formData.newPassword === formData.currentPassword) {
      alert('새로운 비밀번호는 기존 비밀번호와 달라야 합니다.');
      return;
    } else if (formData.newPassword !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await apiInstance.put('/user/existing-password-change', {
        id: user.id,
        password: formData.newPassword
      });
      if (response.status === 200) {
        alert('비밀번호 변경 완료');
        setIsPasswordConfirmed(false);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        onClose();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        alert('비밀번호 변경되지 않았습니다.');
      } else {
        console.error('비밀번호 변경 중 오류가 발생했습니다.');
      }
    }
  };

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    onClose();
  };

  return (
    <dialog id="my_modal_3" className="modal" ref={dialogRef}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">{title}</h3>

        <div className="flex flex-col gap-2 w-[392px] items-center h-[240px]">
          <div className="flex flex-row justify-between w-full">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={(e) => {
                  handleChange(e);
                  // props.ChooseLanguage(el.id);
                }}
                // onChange={handleChange}
                placeholder="기존의 비밀번호를 입력해주세요."
                className="grow w-[240px] text-sm"
              />
            </label>
            <button className="check-button" type="button" onClick={checkCurrentPassword}>
              확인
            </button>
          </div>

          {errors.currentPassword && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errors.currentPassword}</span>
            </div>
          )}

          <CSSTransition
            in={isPasswordConfirmed}
            timeout={300}
            classNames="slide"
            unmountOnExit
            nodeRef={newPasswordSectionRef} // nodeRef로 DOM 요소 참조 전달
          >
            <div
              className="flex flex-col gap-2 w-[392px] items-center h-[20rem]"
              ref={newPasswordSectionRef} // ref로 직접 DOM 요소 참조
            >
              <div className="flex flex-row justify-between w-full">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="새로운 비밀번호를 입력해주세요."
                    className="grow w-[240px] text-sm"
                  />
                </label>
              </div>
              {errors.newPassword && (
                <div className="error-message text-xs">{errors.newPassword}</div>
              )}
              <div className="flex flex-row justify-between w-full">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="다시 입력해주세요."
                    className="w-[240px] grow text-sm"
                  />
                </label>
                <button
                  className="check-button bg-red-600"
                  type="button"
                  onClick={ExistingPasswordChange}
                >
                  변경
                </button>
              </div>
              {formData.confirmPassword === formData.newPassword ? (
                <div className="text-sm text-colorOn">비밀번호가 일치합니다</div>
              ) : (
                <div className="text-error text-sm">{errors.confirmPassword}</div>
              )}
            </div>
          </CSSTransition>
        </div>
      </div>
    </dialog>
  );
};

export default ExistingPasswordChangeModal;
