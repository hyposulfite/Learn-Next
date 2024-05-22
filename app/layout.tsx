// 将全局样式添加到应用程序
import '@/app/ui/global.css';

import { inter } from '@/app/ui/fonts'; // 在全局字体配置中引入 inter
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 使用字体  Tailwind antialiased 类 使字体平滑 */}
      <body  className={`${inter.className} antialiased`} >{children}</body>
    </html>
  );
}
