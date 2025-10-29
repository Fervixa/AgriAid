import "./globals.css";
import { AuthProvider } from "@/context/Authcontext";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "AgriAid | AI Crop Health Scoring & Plant Disease Detection 🌾",
    template: "%s | AgriAid",
  },
  description:
    "AgriAid is an AI-powered crop health scoring platform that detects plant diseases, predicts crop health, and provides personalized remedies for farmers and gardeners.",
  keywords: [
    "AI crop health app",
    "plant disease detection",
    "agriculture AI",
    "smart farming",
    "crop monitoring",
    "AI farming app",
    "AgriAid",
    "plant health AI",
    "crop health scoring",
  ],
  authors: [{ name: "AgriAid Team", url: "https://agriaid.vercel.app" }],
  creator: "AgriAid",
  metadataBase: new URL("https://agriaid.vercel.app"),
  openGraph: {
    title: "AgriAid | AI Crop Health Scoring & Plant Disease Detection 🌾",
    description:
      "Analyze your plants’ health with AgriAid — the AI-powered crop doctor that detects diseases and offers smart remedies instantly.",
    url: "https://agriaid.vercel.app",
    siteName: "AgriAid",
    images: [
      {
        url: "https://agriaid.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "AgriAid - AI Crop Health App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgriAid 🌾 | AI Crop Health Scoring App",
    description:
      "Check your crop's health using AgriAid — the AI-powered crop doctor that detects diseases and provides remedies.",
    images: ["https://agriaid.vercel.app/og-image.png"],
    creator: "@AgriAid",
  },
  alternates: {
    canonical: "https://agriaid.vercel.app",
  },
  category: "Agriculture AI",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org JSON-LD for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AgriAid",
              applicationCategory: "Agriculture AI",
              operatingSystem: "Web",
              description:
                "AgriAid is an AI-powered crop health scoring tool that helps farmers detect plant diseases and find remedies instantly.",
              url: "https://agriaid.vercel.app",
              creator: {
                "@type": "Organization",
                name: "AgriAid",
              },
            }),
          }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
