import "./globals.css";
import { AuthProvider } from "@/context/Authcontext";

export const metadata = {
  title: "AgriAid 🌾",
  description: "Your AI-powered crop doctor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
