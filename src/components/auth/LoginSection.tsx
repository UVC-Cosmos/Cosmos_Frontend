import { FormEvent, useState } from 'react';
import * as Yup from 'yup';
import { apiInstance } from '../../api/api';
const LoginSection = (): JSX.Element => {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    userId: '',
    password: ''
  });

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('비밀번호는 필수 입력 항목입니다.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    userId: Yup.string().required('아이디는 필수 입력 항목입니다.')
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
    e.preventDefault(); // 폼의 기본 제출 동작 방지
    try {
      // formData의 속성을 구조 분해 할당하여 전송 데이터 구성
      const response = await apiInstance.post('/auth/login', {
        userId: formData.userId,
        password: formData.password
      });
      console.log(response, '로그인 성공');
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await apiInstance.post('/auth/login', {
  //       userId: formData.userId,
  //       password: formData.password
  //     });

  //     console.log(response, '로그인 성공');

  //     // 로그인 성공 시 세션 쿠키 값 가져오기
  //     const cookies = document.cookie.split('; ');
  //     console.log(cookies, '쿠키값');
  //     const sessionCookie = cookies.find((cookie) => cookie.startsWith('connect.sid=')); // 세션 쿠키 이름 확인 필요
  //     console.log(sessionCookie, '세션쿠키');
  //     const sessionId = sessionCookie ? sessionCookie.split('=')[1] : null;
  //     console.log(sessionId, '세션아이디');
  //     // Session Storage에 저장
  //     if (sessionId) {
  //       sessionStorage.setItem('sessionId', sessionId);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">로그인</h1>
        <div className="flex flex-col gap-2 w-[20rem]">
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
          {errors.userId && <div className="error-message text-xs">{errors.userId}</div>}
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
          로그인
        </button>
        <a className="find-password" href="#">
          패스워드 찾기
        </a>
      </form>
    </div>
  );
};

export default LoginSection;
