import { useState } from 'react';
import * as Yup from 'yup';
import { apiInstance } from '@/api/api';
import { AxiosError } from 'axios';
import { CSSTransition } from 'react-transition-group';
import './modal.css'; // CSS 파일 추가

interface ExistingPasswordChangeProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const ExistingPasswordChangeModal: React.FC<ExistingPasswordChangeProps> = ({
  isOpen,
  onClose,
  title
}) => {
  // const [currentPassword, setCurrentPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
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

  if (!isOpen) return null;

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
      alert('기존 비밀번호를 입력해주세요.');
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
        alert('비밀번호가 일치하지 않습니다.');
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-auto max-h-[80vh] min-h-[240px] overflow-auto">
        <h2 className="form-title">{title}</h2>
        <div className="border-b-2 mb-3" />
        <button className="absolute top-2 right-3 text-xl" onClick={onClose}>
          &times;
        </button>
        {/* <div className="flex flex-col border-2"> */}
        <div className="flex flex-col gap-2 w-[392px] items-center h-[240px]">
          <div className="flex flex-row justify-between w-full">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="기존의 비밀번호를 입력해주세요."
                className="grow w-[240px] text-sm"
              />
            </label>
            <button className="check-button" type="button" onClick={checkCurrentPassword}>
              확인
            </button>
          </div>
          {isPasswordConfirmed ? (
            <div className="text-sm text-green-500">비밀번호 확인 완료 !</div>
          ) : (
            <div className="error-message text-sm">기존의 비밀번호를 입력해주세요</div>
          )}

          <CSSTransition in={isPasswordConfirmed} timeout={300} classNames="slide" unmountOnExit>
            <div className="flex flex-col gap-2 w-[392px] items-center h-[20rem]">
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
              {formData.confirmPassword == formData.newPassword ? (
                <div className="text-sm text-green-500">비밀번호가 일치합니다</div>
              ) : (
                <div className="text-error text-sm">{errors.confirmPassword}</div>
              )}
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ExistingPasswordChangeModal;
