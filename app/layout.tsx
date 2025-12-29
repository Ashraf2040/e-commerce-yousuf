import './globals.css';
import { ReduxProvider } from './store/Provider';
import AuthProvider from './auth/Provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Shop Demo',
  description: 'Figma to Next.js demo e-commerce UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
