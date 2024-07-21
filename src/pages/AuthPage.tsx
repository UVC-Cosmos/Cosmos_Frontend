import { useState } from 'react';
import LoginSection from '../components/auth/LoginSection';
import Overlay from '../components/auth/Overlay';
import SignupSection from '../components/auth/SignupSection';
import './AuthPage.css';

const AuthPage = (): JSX.Element => {
  const [panelActive, setPenelActive] = useState<boolean>(false);
  const handleClickSignUpButton = () => setPenelActive(true);
  const handleClickSignInButton = () => setPenelActive(false);

  return (
    <div>
      <div className={`container ${panelActive ? `right-panel-active` : ``}`}>
        <SignupSection />
        <LoginSection />
        <Overlay
          handleClickSignInButton={handleClickSignInButton}
          handleClickSignUpButton={handleClickSignUpButton}
        />
      </div>
    </div>
  );
};

export default AuthPage;
