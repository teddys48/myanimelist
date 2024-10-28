import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex w-full flex-row max-h-screen max-sm:max-h-full">{children}</body>
    </html>
  );
}
