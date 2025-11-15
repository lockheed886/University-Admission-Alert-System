import './globals.css';

export const metadata = {
  title: 'University Admission Alert System',
  description: 'Track and manage university admission details, deadlines, and scholarship information',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
