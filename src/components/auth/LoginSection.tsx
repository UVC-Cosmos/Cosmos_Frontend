import { useState } from 'react';
import * as Yup from 'yup';
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

  const handleSubmit = async () => {
    // e.preventDefault();
    // try {
    //   await validationSchema.validate(formData, { abortEarly: false });
    //   // 유효성 검사 통과 시 회원가입 처리 로직 (API 호출 등)
    //   console.log(formData);
    // } catch (err) {
    //   if (err instanceof Yup.ValidationError) {
    //     const newErrors = {};
    //     err.inner.forEach((error) => {
    //       newErrors[error.path] = error.message;
    //     });
    //     setErrors(newErrors);
    //   }
    // }
  };

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
