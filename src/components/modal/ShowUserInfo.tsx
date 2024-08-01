import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import ExistingPasswordChangeModal from './ExistingPasswordChange';
import './ShowUserInfo.css';
import { IFactory, ILine, IUser } from '@/interface/authInterface';

interface ShowUserInfoProps {
  onClose: () => void;
}

interface IUser2 extends IUser {
  rank: string;
  Factories: IFactory[];
  Lines: ILine[];
}

const ShowUserInfo: React.FC<ShowUserInfoProps> = ({ onClose }) => {
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false);

  const user: IUser2 = JSON.parse(localStorage.getItem('user') || '{}');

  const openExistingPasswordChangeModal = () => setIsPasswordChangeModalOpen(true);
  const closeExistingPasswordChangeModal = () => setIsPasswordChangeModalOpen(false);

  return (
    <div className="fixed inset-0 flex items-start justify-start ml-[82px]">
      <div className="bg-white p-6 rounded-lg shadow-lg relative h-full w-[400px]">
        <div className="mb-3"></div>
        <button className="absolute top-2 right-3 text-2xl" onClick={onClose}>
          &times;
        </button>
        <div className="overflow-x-auto">
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <th>이름(Name)</th>
                <td className="from-neutral-950">{user.userName}</td>
              </tr>
              <tr>
                <th>아이디(ID)</th>
                <td>
                  <ul>{user.userId}</ul>
                </td>
              </tr>
              <tr>
                <th>비밀번호(PW)</th>
                <td>
                  <ul>
                    <button className="btn btn-sm" onClick={openExistingPasswordChangeModal}>
                      비밀번호 변경
                    </button>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>이메일(Email)</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>소속 공장(Factories)</th>
                <td>
                  <ul>
                    {user.Factories.map((factory, index) => (
                      <li key={index}>{factory.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <th>직급(Rank)</th>
                <td>
                  <ul>{user.rank}</ul>
                </td>
              </tr>
              <tr>
                <th>제어 권한(Line)</th>
                <td>
                  <ul>
                    {user.Lines.length > 0 ? (
                      user.Lines.map((line, index) => <li key={index}>{line.name}</li>)
                    ) : (
                      <li>없음</li>
                    )}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CSSTransition으로 모달 애니메이션 적용 */}
      <CSSTransition in={isPasswordChangeModalOpen} timeout={300} classNames="modal" unmountOnExit>
        <ExistingPasswordChangeModal
          onClose={closeExistingPasswordChangeModal}
          title="비밀번호 변경"
        />
      </CSSTransition>
    </div>
  );
};

export default ShowUserInfo;
