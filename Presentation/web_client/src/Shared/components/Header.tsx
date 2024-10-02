import { useContext } from 'react';
import { LightBulbOff, LightBulbOn } from './Icons.tsx';
import { AppContext } from '../../providers/AppContext.tsx';
import { createTheme } from '@mui/material/styles';
import { cookieManager } from '../../data/utils/tools.ts';
import { IconButton } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function Header() {
  const { state, setState } = useContext(AppContext);
  const location = useLocation();

  const toggleTheme = () => {
    cookieManager.set(
      'color_scheme',
      state.theme.palette.mode === 'light' ? 'dark' : 'light'
    );
    setState((prevState) => ({
      ...prevState,
      theme: createTheme({
        palette: {
          mode: prevState.theme.palette.mode === 'light' ? 'dark' : 'light',
        },
      }),
    }));
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {location.pathname !== '/' ?
        <Link to="/">
          <IconButton className="dark:text-white">
            <ArrowBackIcon />
          </IconButton>
        </Link> : <div></div>
      }
      <IconButton onClick={toggleTheme} className="dark:text-white">
        {state.theme.palette.mode === 'light' ? (
          <LightBulbOff />
        ) : (
          <LightBulbOn />
        )}
      </IconButton>
    </div>
  );
}
