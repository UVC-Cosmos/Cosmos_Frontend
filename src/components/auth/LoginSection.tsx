import { useSetAtom } from 'jotai';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { apiInstance } from '../../api/api';
import { isLoginAtom, userAtom } from '../../atom/auth/authAtom';
import { IUser } from '../../interface/authInterface';
const LoginSection = (): JSX.Element => {
  const navigate = useNavigate();
  const setIsLogin = useSetAtom(isLoginAtom);
  const setUser = useSetAtom(userAtom);
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
      const userData = response.data as IUser;
      console.log(userData, '유저 데이터');
      setIsLogin(true);
      setUser(userData);
      if (userData.role === 'Admin') {
        navigate('/admin/member');
      } else {
        navigate('/main/dashboard');
      }
    } catch (error) {
      setIsLogin(false);
      setUser(null);
      console.log(error);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title text-3xl">로그인</h1>
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
      </form>
    </div>
  );
};

export default LoginSection;
