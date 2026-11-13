export const metadata = {
  title: 'Global AI Studio',
  description: 'Powered by Meta Model API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
