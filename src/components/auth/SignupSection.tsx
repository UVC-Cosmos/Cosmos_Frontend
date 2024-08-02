import { useAtom, useAtomValue } from 'jotai';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { apiInstance } from '../../api/api';
import {
  emailCheckAtom,
  emailCheckBtnClickAtom,
  userIdCheckAtom
} from '../../atom/auth/signupAtom';
import EmailValidationModal from '../modal/EmailValidationModal';

const SignupSection: React.FC = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [isIdDuplicate, setIsIdDuplicate] = useAtom(userIdCheckAtom);
  const [isIdDuplicateClick, setIsIdDuplicateClick] = useState<boolean>(false);
  const isEmailCheck = useAtomValue(emailCheckAtom);
  const [isEmailCheckClick, setIsEmailCheckClick] = useAtom(emailCheckBtnClickAtom);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSamePassword, setIsSamePassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: '',
    userId: '',
    userName: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    userId: '',
    userName: '',
    password: ''
  });

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('유효한 이메일 주소를 입력해주세요.')
      .required('이메일은 필수 입력 항목입니다.'),
    password: Yup.string()
      .required('비밀번호는 필수 입력 항목입니다.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    userName: Yup.string().required('이름은 필수 입력 항목입니다.'),
    userId: Yup.string()
  });

  const emailCheckClick = () => {
    setIsEmailCheckClick(true);
  };

  // handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // 입력값 변경 시 실시간 유효성 검사
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch((err) => setErrors({ ...errors, [name]: err.message }));
  };

  const handleEmailModal = () => {
    setIsEmailModalOpen(!isEmailModalOpen);
  };

  // ID 중복
  const checkDuplicateId = async () => {
    try {
      await apiInstance.post('/auth/idDuplicateCheck', { userId: formData.userId }).then((res) => {
        if (res.status === 200 && res.data === false) {
          setIsIdDuplicate(true);
          setIsIdDuplicateClick(true);
          console.log('아이디 중복 확인 성공');
        } else if (res.status === 200 && res.data === true) {
          setIsIdDuplicate(false);
          setIsIdDuplicateClick(true);
          console.log('아이디 사용 가능');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 비밀번호 확인
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  // // 비밀번호 일치 확인
  // const isPasswordMatch = () => {
  //   if (formData.password !== confirmPassword) {
  //     setIsSamePassword(false);
  //   } else {
  //     setIsSamePassword(true);
  //   }
  // };

  // 이메일 인증 버튼 클릭 함수
  const handleEmailVerification = async () => {
    try {
      const response = await apiInstance.post('/auth/verify-email', { email: formData.email });
      console.log(response.data);
      console.log('이메일 인증 요청');
      handleEmailModal();
    } catch (error) {
      console.log(error);
    }
  };

  // 회원가입 요청
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiInstance.post('/user', formData);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title text-3xl">회원가입</h1>
        <div className="flex flex-col gap-2 w-[20rem]">
          <div className="flex flex-row justify-between">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                name="userId"
                placeholder="ID"
                value={formData.userId}
                onChange={handleChange}
              />
            </label>
            <button className="check-button" type="button" onClick={checkDuplicateId}>
              중복확인
            </button>
          </div>
          {isIdDuplicate && isIdDuplicateClick && (
            <div className="error-message text-xs">아이디가 중복됩니다.</div>
          )}
          {!isIdDuplicate && isIdDuplicateClick && (
            <div className="error-message text-xs">사용 가능한 아이디입니다.</div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-[20rem]">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="userName"
              className="w-auto"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
            />
          </label>
          {errors.userName && <div className="error-message text-xs">{errors.userName}</div>}
        </div>
        <div className="flex flex-col gap-2 w-[20rem]">
          <div className="flex flex-row justify-between">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <button className="check-button" type="button" onClick={handleEmailVerification}>
              인증
            </button>
          </div>
          {isEmailCheck && isEmailCheckClick && (
            <div className="error-message text-xs">인증이 완료되었습니다.</div>
          )}
          {!isEmailCheck && isEmailCheckClick && (
            <div className="error-message text-xs">이메일 인증을 완료해주세요.</div>
          )}
          {/* {isEmailCheck ? (
            <div className="error-message text-xs">인증이 완료되었습니다.</div>
          ) : (
            <div className="error-message text-xs">이메일 인증을 완료해주세요.</div>
          )} */}
          {/* {errors.email && <div className="error-message text-xs">{errors.email}</div>} */}
        </div>
        <div className="flex flex-col gap-2 w-[20rem]">
          <label className="input input-bordered flex flex-row items-center gap-2">
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {errors.password && <div className="error-message text-xs">{errors.password}</div>}
        </div>
        <div className="flex flex-col gap-2 w-[20rem]">
          <label className="input input-bordered flex flex-row items-center gap-2">
            <input
              type="password"
              name="confirmPassword"
              className="grow"
              placeholder="Password Check"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
          </label>
          {confirmPassword.length !== 0 &&
            formData.password !== confirmPassword &&
            confirmPassword.length >= formData.password.length && (
              <div className="error-message text-xs">비밀번호가 일치하지 않습니다.</div>
            )}
          {confirmPassword.length !== 0 &&
            formData.password === confirmPassword &&
            confirmPassword.length === formData.password.length && (
              <div className="error-message text-xs">비밀번호가 일치합니다.</div>
            )}
        </div>
        <button
          type="submit"
          className={`form-button ${!isEmailCheck ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={!isEmailCheck}
        >
          회원가입
        </button>
      </form>
      {isEmailModalOpen && (
        <EmailValidationModal
          checkEmail={formData.email}
          toggleModal={handleEmailModal}
          emailCheckClick={emailCheckClick}
        />
      )}
    </div>
  );
};

export default SignupSection;
