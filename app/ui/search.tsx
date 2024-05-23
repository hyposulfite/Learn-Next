'use client';
// "use client"  - 这是一个客户端组件，这意味着您可以使用事件侦听器和钩子

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';


import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({placeholder}: { placeholder: string }) {

    // 获取url上的参数
    const searchParams = useSearchParams();
    /*
    * 解释：此处使用 useSearchParams() 钩子来获取当前 URL 的搜索参数。
    * 使用场景是在客户端运行
    * 客户端读取参数，请使用 useSearchParams() 钩子
    * */
    // 当前路径，在当前情况下， 应该是"/dashboard/invoices"
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term: string)=> {
        // 捕获用户的输入
        console.log(term);
        // 使用搜索参数更新 URL。
        const params = new URLSearchParams(searchParams);
        // URLSearchParams 用于操作 URL 查询参数的实用工具方法。您可以使用它来获取参数字符串，
        // 而不是创建复杂的字符串文本，例如 ?page=1&query=a
        params.set('page', '1');  // 用户输入新的搜索查询时，您需要将页码重置为 1
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        // 使 URL 与输入字段保持同步
        // 仅更新 URL，而不会重新加载页面。
        replace(`${pathname}?${params.toString()}`);
    },300)

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
        </div>
    );
}
