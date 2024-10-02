import React, { createContext, useState } from 'react';
import { createTheme, Theme } from '@mui/material';
import { cookieManager } from '../data/utils/tools.ts';

interface AppState {
  theme: Theme;
}

const initialState: AppState = {
  theme: createTheme({
    palette: {
      mode: cookieManager.get('color_scheme') === 'dark' ? 'dark' : 'light',
    },
  }),
};

export const AppContext = createContext<{
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}>({
  state: initialState,
  setState: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}
