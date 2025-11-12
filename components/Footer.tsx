import Image from "next/image";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-gray-50 border-t", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Image
                src="/logo.svg"
                alt="Jobpang Logo"
                width={133}
                height={36}
              />
            </div>
            <p className="text-gray-600 max-w-md">
              15년간 축적된 취업컨설팅 노하우와 데이터로, 구직자와 기업을
              연결하는 잡프라이즈의 공식 콘텐츠 채널입니다.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Blog
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/posts"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  All Posts
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="http://pf.kakao.com/_CxofCd"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  KaKaoTalk
                </a>
              </li>
              <li>
                <a
                  href="https://blog.naver.com/jobprise"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Naver
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} 잡프라이즈(JobPrise). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
