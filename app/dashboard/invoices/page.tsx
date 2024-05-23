import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import {CreateInvoice} from '@/app/ui/invoices/buttons';
import {lusitana} from '@/app/ui/fonts';
import {InvoicesTableSkeleton} from '@/app/ui/skeletons';
import {Suspense} from 'react';

import { fetchInvoicesPages } from '@/app/lib/data';

// 默认显示发票列表
// export default async function Page() {

// 从url中获取查询和页码参数
export default async function Page({
                                       searchParams,
                                   }: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    /*
    * 解释：此处使用searchParams
    * 使用场景是在服务端运行
    * */
    const totalPages = await fetchInvoicesPages(query);
    // 更新表以反映搜索查询
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                {/* <Search/> 允许用户搜索特定发票 */}
                <Search placeholder="Search invoices..."/>
                <CreateInvoice/>
            </div>
            {/* <Table/> 显示发票列表 */}
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
                <Table query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination/> 允许用户在发票页面之间导航  分页 */}
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}
