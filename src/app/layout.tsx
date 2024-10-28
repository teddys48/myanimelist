import Sidebar from "@/components/sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex w-full flex-row max-h-screen">
        {/* <Sidebar></Sidebar> */}
        {children}
      </body>
    </html>
  );
}
