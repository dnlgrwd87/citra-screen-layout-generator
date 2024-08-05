import { ThemeProvider } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
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
                <body className="bg-gray-100">
                    <Navbar />
                    <div className="py-8">{children}</div>
                    <Analytics />
                </body>
            </ThemeProvider>
        </html>
    );
}
