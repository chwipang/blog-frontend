import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default:
      process.env.NEXT_PUBLIC_SITE_NAME ||
      "잡프라이즈 블로그 | 취업의신 공식 채널",
    template: `%s | ${
      process.env.NEXT_PUBLIC_SITE_NAME || "잡프라이즈 블로그"
    }`,
  },
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "잡프라이즈 블로그 - 15년 취업 컨설팅 노하우와 1,600만 방문 데이터를 기반으로 취업·채용 인사이트를 제공합니다.",
  keywords: [
    "잡프라이즈",
    "취업의신",
    "취업컨설팅",
    "면접",
    "자소서",
    "잡콘서트",
    "취업",
    "채용",
    "합격",
    "입사지원",
  ],
  authors: [{ name: "잡프라이즈" }],
  creator: "잡프라이즈",
  publisher: "잡프라이즈",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "잡프라이즈 블로그",
    title:
      process.env.NEXT_PUBLIC_SITE_NAME ||
      "잡프라이즈 블로그 | 취업의신 공식 채널",
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
      "15년 취업 컨설팅 노하우와 1,600만 방문 데이터를 기반으로 취업·채용 인사이트를 제공합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_SITE_NAME || "잡프라이즈 블로그",
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
      "15년 취업 컨설팅 노하우와 1,600만 방문 데이터를 기반으로 취업·채용 인사이트를 제공합니다.",
    creator: "@jobprise",
  },
  verification: {
    google: "HRkWAN9MmzRYdLFVpBNMOhpjdWeQGiCI2i6vmr5NGas",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
