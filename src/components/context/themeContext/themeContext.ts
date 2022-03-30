import { createTheme } from '@mui/material';
import { createContext } from 'react';

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
}

export const primaryTheme = createTheme({
    palette: {
      primary: {
        main: '#058ff1',
      },
    },
});

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});