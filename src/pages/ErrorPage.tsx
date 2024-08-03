import { useNavigate } from 'react-router';

export const ErrorPage = (): JSX.Element => {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  };
  return (
    <div className="h-screen w-screen">
      <div className="m-auto w-[80%] h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[70%] h-[40%] border-2 border-colorOff rounded-lg">
          <div className="text-7xl">접근 권한이 없습니다.</div>
          <p className="text-4xl">관리자에게 문의하세요.</p>
          <button className="mt-4 btn text-white bg-black rounded-lg p-2" onClick={goToMain}>
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
