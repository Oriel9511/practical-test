import { useContext, useEffect, useState } from 'react';
import './App.css';
import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { cookieManager } from './data/utils/tools.ts';
import { AppContext } from './providers/AppContext.tsx';
import { Outlet } from 'react-router-dom';
import {Layout} from "./Layout.tsx";

const style = `
    input::-webkit-calendar-picker-indicator {
      filter: ${cookieManager.get('color_scheme') === 'dark' ? 'invert(1)' : 'invert(0)'};
    }
  `;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, _setError] = useState(false);
  const { state, setState: _ } = useContext(AppContext);

  useEffect(() => {
      setTimeout(() => setIsLoading(false), 2000)
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error connecting to the server...</div>;
  }

  return (
    <ThemeProvider theme={state.theme}>
      <CssBaseline />
          <Layout style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}>
            <div style={{
              textAlign: 'center',
            }}>
              <Outlet />
            </div>
          </Layout>
      <style dangerouslySetInnerHTML={{ __html: style }} />
    </ThemeProvider>
  );
}

export default App;
