import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chicatechhub.onrender.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ChicaTechHub | Custom Software, Fintech & AI Solutions",
    template: "%s | ChicaTechHub",
  },
  description:
    "ChicaTechHub builds billing & GST software, lending platforms, AI solutions and custom web apps. Founded by Janani Asokan, Cloud API Automation Engineer at Signify (Philips).",
  keywords: ["freelance developer India", "billing software", "GST software", "loan management software", "AI solutions", "web development Bengaluru", "ChicaTechHub"],
  openGraph: {
    title: "ChicaTechHub | Custom Software, Fintech & AI Solutions",
    description: "Billing software, lending platforms, AI and automation for growing businesses.",
    images: ["/profile.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1424",
};

// Applies saved/system theme before paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
