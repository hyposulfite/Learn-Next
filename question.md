1. `next/font`: 当您使用该 `next/font` 模块时，Next.js会自动优化应用程序中的字体。
   它会在构建时下载字体文件，并将它们与其他静态资产一起托管。
   这意味着当用户访问您的应用程序时，不会有额外的字体网络请求，这会影响性能。

   > Next.js 在构建时下载字体文件，并将它们与其他静态资产一起托管。这意味着当
   > 用户访问您的应用程序时，不会有额外的字体网络请求，这会影响性能。

2. `<Image>` 组件: `next/image` 是 Next.js 提供的一个组件，用于优化图像加载。
   它使用 Next.js 的内置图像优化功能，包括自动压缩和优化图像大小。
3. 为了改善导航体验，Next.js 会自动按路由段对应用程序进行代码拆分。这与传统的 React
   SPA 不同，在传统的 React SPA 中，浏览器会在初始加载时加载所有应用程序代码。
   按路由拆分代码意味着页面变得孤立。如果某个页面抛出错误，应用程序的其余部分仍将正常工作
   [ how navigation works](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)
4. [this guide on GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories)
5. [ Segment Config Option ](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
6. [read again](https://nextjs.org/learn/dashboard-app/partial-prerendering)
7. [navigating between pages](https://nextjs.org/learn/dashboard-app/navigating-between-pages)
8.  Controlled vs. Uncontrolled: In React, there are two types of components: controlled and uncontrolled.
9. [ use-debounce](https://www.npmjs.com/package/use-debounce)
10. react form action 属性
11. [Zod](https://zod.dev/) ：a TypeScript-first validation library that can simplify this task for you.
12. [error.tsx](https://nextjs.org/docs/app/api-reference/file-conventions/error)
