import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { MqttProvider } from './context/mqttContext';
import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <MqttProvider>
            <Router />
          </MqttProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
