import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

// 요청 시 401 에러가 발생하면,
// 세션 쿠키를 확인하고, 세션 쿠키가 존재하지 않으면,
// 로그아웃 처리로 로컬 스토리지를 삭제하고, / 페이지로 리다이렉트

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('isLogin');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export { apiInstance };
