'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    height: 38,
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    height: 38,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    height: 38,
                },
            },
        },
    },
});

export default theme;
