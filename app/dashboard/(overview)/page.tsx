import { Suspense } from 'react';
import { RevenueChartSkeleton,LatestInvoicesSkeleton,CardsSkeleton  } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import {Card} from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import {lusitana} from '@/app/ui/fonts';

// fetch data
// import {fetchRevenue, fetchLatestInvoices, fetchCardData} from '@/app/lib/data';// 已经remove fetchRevenue
// import { fetchLatestInvoices, fetchCardData} from '@/app/lib/data';
// import {  fetchCardData} from '@/app/lib/data';

export default async function Page() {
    // const revenue = await fetchRevenue(); // 已经remove fetchRevenue
    // const latestInvoices = await fetchLatestInvoices(); // remove
    // const {
    //     numberOfCustomers,
    //     numberOfInvoices,
    //     totalPaidInvoices,
    //     totalPendingInvoices,
    // } = await fetchCardData();
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/*<Card title="Collected" value={totalPaidInvoices} type="collected"/>*/}
                {/*<Card title="Pending" value={totalPendingInvoices} type="pending"/>*/}
                {/*<Card title="Total Invoices" value={numberOfInvoices} type="invoices"/>*/}
                {/*<Card*/}
                {/*    title="Total Customers"*/}
                {/*    value={numberOfCustomers}*/}
                {/*    type="customers"*/}
                {/*/>*/}

                {/* 流式加载卡片 */}
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* 普通加载 图表 */}
                {/*<RevenueChart revenue={revenue}/>*/}
                {/* 流式加载图表 */}
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart  />
                </Suspense>
                {/* 普通 最新发票 */}
                {/*<LatestInvoices latestInvoices={latestInvoices}/>*/}
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices  />
                </Suspense>

            </div>
        </main>
    );
}
