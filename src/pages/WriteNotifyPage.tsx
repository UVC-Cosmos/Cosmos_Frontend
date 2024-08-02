import { apiInstance } from '@/api/api';
import { useState } from 'react';

const WriteNotifyPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await apiInstance.post('공지사항작성', {
        title,
        content
      });
      alert('공지사항이 성공적으로 작성되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="w-full h-full flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold">공 지</h1>
        <div className="w-1/3 mt-14">
          <input
            placeholder="제목을 입력해주세요."
            className="input input-bordered input-success w-full"
            onChange={handleTitleChange}
          />
        </div>
        <div className="w-1/3 mt-8">
          <textarea
            className="textarea textarea-accent w-full h-96 resize-none"
            placeholder="내용을 입력해주세요."
            onChange={handleContentChange}
          />
        </div>
        <button
          className="btn btn-outline btn-accent w-1/3 mt-8 bg-mainColor"
          onClick={handleSubmit}
        >
          작성
        </button>
      </div>
    </div>
  );
};

export default WriteNotifyPage;
