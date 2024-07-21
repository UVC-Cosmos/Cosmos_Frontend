import React, { FormEvent, useState } from 'react';
import * as Yup from 'yup';
import { apiInstance } from '../../api/api';

const SignupSection: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    userId: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    userId: '',
    username: '',
    password: ''
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('유효한 이메일 주소를 입력해주세요.')
      .required('이메일은 필수 입력 항목입니다.'),
    password: Yup.string()
      .required('비밀번호는 필수 입력 항목입니다.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    userId: Yup.string().required('아이디는 필수 입력 항목입니다.'),
    username: Yup.string().required('이름은 필수 입력 항목입니다.')
  });

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiInstance.post('/auth', formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">회원가입</h1>
        <div className="flex flex-col gap-2 w-[20rem]">
          <div className="flex flex-row justify-between">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                name="userId"
                placeholder="userId"
                value={formData.userId}
                onChange={handleChange}
              />
            </label>
            <button className="check-button">중복검사</button>
          </div>
          {errors.userId && <div className="error-message text-xs">{errors.userId}</div>}
        </div>
        <div className="flex flex-col gap-2 w-[20rem]">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="username"
              className="w-auto"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          {errors.username && <div className="error-message text-xs">{errors.username}</div>}
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
            <button className="check-button">인증</button>
          </div>

          {errors.email && <div className="error-message text-xs">{errors.email}</div>}
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

        <button type="submit" className="form-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupSection;
