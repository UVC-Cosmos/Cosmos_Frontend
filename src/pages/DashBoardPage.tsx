import React from "react";
import UnityComponent from "../components/unity/UnityComponent";
import useSocket from "../hooks/useSocket";

const DashBoardPage = () => {
  const [socket, sendMessage] = useSocket("http://192.168.0.16:3000", "UVC-EDU-01");

  return (
    <>
      <UnityComponent />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => sendMessage("1", "1")} style={buttonStyle}>Start</button>
          <button onClick={() => sendMessage("1", "0")} style={buttonStyle}>Stop</button>
          <button onClick={() => sendMessage("8", "1")} style={buttonStyle}>Reset</button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => sendMessage("9", "1")} style={buttonStyle}>1호기 ON</button>
          <button onClick={() => sendMessage("9", "0")} style={buttonStyle}>1호기 OFF</button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => sendMessage("10", "1")} style={buttonStyle}>2호기 ON</button>
          <button onClick={() => sendMessage("10", "0")} style={buttonStyle}>2호기 OFF</button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => sendMessage("11", "1")} style={buttonStyle}>3호기 ON</button>
          <button onClick={() => sendMessage("11", "0")} style={buttonStyle}>3호기 OFF</button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => sendMessage("12", "1")} style={buttonStyle}>Sensor1 ON</button>
          <button onClick={() => sendMessage("12", "0")} style={buttonStyle}>Sensor1 OFF</button>
        </div>
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => sendMessage("13", "1")} style={buttonStyle}>Sensor2 ON</button>
          <button onClick={() => sendMessage("13", "0")} style={buttonStyle}>Sensor2 OFF</button>
        </div>
      </div>
    </>
  );
};

const buttonStyle = {
  margin: '0 5px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default DashBoardPage;
