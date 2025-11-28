import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

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
    "취업의신 잡프라이즈 블로그 - 15년 취업 컨설팅 노하우와 1,600만 방문 데이터를 기반으로 취업·채용 인사이트를 제공합니다. 취업의신과 함께하는 합격 전략.",
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
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "취업의신 잡프라이즈 블로그",
    title:
      process.env.NEXT_PUBLIC_SITE_NAME ||
      "잡프라이즈 블로그 | 취업의신 공식 채널",
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
      "취업의신 잡프라이즈 - 15년 취업 컨설팅 노하우와 1,600만 방문 데이터를 기반으로 취업·채용 인사이트를 제공합니다. 취업의신과 함께하는 합격 전략.",
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_SITE_NAME || "취업의신 잡프라이즈 블로그",
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
      "취업의신 잡프라이즈 - 15년 취업 컨설팅 노하우와 1,600만 방문 데이터를 기반으로 취업·채용 인사이트를 제공합니다. 취업의신과 함께하는 합격 전략.",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "취업의신 잡프라이즈",
    alternateName: ["잡프라이즈", "JobPrise", "취업의신"],
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://blog.jobpang.co.kr",
    logo:
      (process.env.NEXT_PUBLIC_SITE_URL || "https://blog.jobpang.co.kr") +
      "/logo.svg",
    description:
      "취업의신 잡프라이즈는 15년 취업 컨설팅 노하우와 1,600만 방문 데이터를 기반으로 취업·채용 인사이트를 제공하는 대한민국 대표 취업 컨설팅 브랜드입니다.",
    sameAs: ["https://blog.naver.com/jobprise", "http://pf.kakao.com/_CxofCd"],
    founder: {
      "@type": "Person",
      name: "박장호",
    },
  };

  return (
    <html lang="ko" className="h-full">
      <head>
        <meta
          name="naver-site-verification"
          content="27d12f6795007245fafa2602fae325c564e0fd46"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} h-full flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <GoogleAnalytics gaId="G-M2PF627LDM" />
        <Footer />
      </body>
    </html>
  );
}
