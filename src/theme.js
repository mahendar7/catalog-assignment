import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['CircularStd', 'Arial'].join(','),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'CircularStd';
              src: url('../public/fonts/circular-std/CircularStd-Book.woff2') format('woff2'),
                   url('../public/fonts/circular-std/CircularStd-Book.woff') format('woff'),
                   url('../public/fonts/circular-std/CircularStd-Book.eot') format('embedded-opentype');
              font-weight: normal;
              font-style: normal;
            }
    
            @font-face {
              font-family: 'CircularStd';
              src: url('../public/fonts/circular-std/CircularStd-Bold.woff2') format('woff2'),
                   url('../public/fonts/circular-std/CircularStd-Bold.woff') format('woff'),
                   url('../public/fonts/circular-std/CircularStd-Bold.eot') format('embedded-opentype');
              font-weight: bold;
              font-style: normal;
            }
          `,
        },
    },

    palette: {
        text: {
            primary: '#6F7177',
            secondary: '#1A243A',
            disabled: '#A0A0A0',
        },
        custom: {
            primary: '#4B40EE',
            white: '#fff',
        },
    },
});

export default theme;
