import { ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';
import './globals.css';
import theme from './theme';

export const metadata: Metadata = {
    title: 'Citra Screen Layout Generator',
    description: 'description',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ThemeProvider theme={theme}>
                <body>{children}</body>
            </ThemeProvider>
        </html>
    );
}
