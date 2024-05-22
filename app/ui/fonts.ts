// 使用此文件来保留将在整个应用程序中使用的字体


// 从 next/font/google 模块导入 Inter 字体 - 这将是您的主要字体
import {Inter, Lusitana} from 'next/font/google';

// 本次使用 latin
export const inter = Inter({subsets: ['latin']});

// 配置辅助字体
export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin']
});
