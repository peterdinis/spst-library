import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import 'react-quill/dist/quill.snow.css';
import { TRPCReactProvider } from '~/trpc/react';
import Navigation from './_components/shared/Navigation';
import { Toaster } from '~/components/ui/toaster';
import { Metadata } from 'next';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata = {
    title: 'Spsť Knižnica',
    description: 'Stránka školskej webovej knižnice',
    icons: [
        {
            rel: 'icon',
            url: 'https://www.spsbj.sk/wp-content/uploads/cropped-original-32x32.png',
        },
    ],
} as Metadata;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={`font-sans ${inter.variable}`}>
                <TRPCReactProvider>
                    <Navigation />
                    {children}
                    <Toaster />
                </TRPCReactProvider>
            </body>
        </html>
    );
}
