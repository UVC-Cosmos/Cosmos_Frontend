import React, { Component } from 'react';
import './AuthP.css';
import SignIn from '../components/auth/Login';
import Overlay from '../components/auth/Overlay';
import SignUp from '../components/auth/Signup';

interface State {
  rightPanelActive: boolean;
}

class App extends Component<{}, State> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      rightPanelActive: false
    };
  }

  handleClickSignUpButton = () =>
    this.setState({
      rightPanelActive: true
    });

  handleClickSignInButton = () =>
    this.setState({
      rightPanelActive: false
    });

  render() {
    const { handleClickSignUpButton, handleClickSignInButton } = this;
    const { rightPanelActive } = this.state;
    return (
      <div className="App">
        <div className={`container ${rightPanelActive ? `right-panel-active` : ``}`} id="container">
          <SignUp />
          <SignIn />
          <Overlay
            handleClickSignInButton={handleClickSignInButton}
            handleClickSignUpButton={handleClickSignUpButton}
          />
        </div>
      </div>
    );
  }
}

export default App;
