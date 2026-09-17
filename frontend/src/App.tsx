import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { customTheme } from './styles/antdTheme';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppRoutes } from './routes/AppRoutes';
import { queryClient } from './config/queryClient';

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ConfigProvider theme={customTheme}>
          <AntApp>
            <AuthProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </AuthProvider>
          </AntApp>
        </ConfigProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
