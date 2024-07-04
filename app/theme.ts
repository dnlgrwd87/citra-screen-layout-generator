'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    '& .MuiSelect-select': {
                        padding: '10px',
                    },
                },
            },
        },
    },
});

export default theme;
