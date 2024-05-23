import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
    // 创建一个服务器操作并从表单中调用它。
    // 验证并准备要插入到数据库中的数据。
    // 插入数据并处理任何错误。
    // 重新验证缓存并将用户重定向回发票页。
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Create Invoice',
                        href: '/dashboard/invoices/create',
                        active: true,
                    },
                ]}
            />
            {/*// 创建一个表单来捕获用户的输入。*/}
            <Form customers={customers} />
        </main>
    );
}
