'use server';
// 将文件中所有导出的函数标记为服务器函数。然后，可以将这些服务器功能导入到客户端和服务器组件中，使它们非常通用。

import {z} from 'zod';
import {sql} from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(), // 设置为强制（更改）从字符串到数字，同时验证其类型。
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

// 新增数据
const CreateInvoice = FormSchema.omit({id: true, date: true});

export async function createInvoice(formData: FormData) {
    // const rawFormData = {
    const {customerId, amount, status} = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })
    // 货币单位设置成美分 ， 消除浮点数的错误
    const amountInCents = amount * 100;

    // 创建日期创建一个格式为“YYYY-MM-DD”的新日期：
    const date = new Date().toISOString().split('T')[0];

    // TODO search MDN
    // 如果您正在处理具有许多字段的表单，则可能需要考虑将该 entries() 方法与 JavaScript 的 Object.fromEntries()
    //     .例如：
    //
    // const rawFormData = Object.fromEntries(formData.entries())
    // Test it out:

    //     console.log(rawFormData);
    //     console.log(typeof rawFormData.amount);
    //     插入数据库
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    // Next.js有一个客户端路由器缓存，用于在用户的浏览器中存储一段时间的路由段。
    // 除了预取之外，此缓存还确保用户可以在路由之间快速导航，同时减少对服务器发出的请求数
    // 更新发票路由中显示的数据，因此您需要清除此缓存并触发对服务器的新请求
    revalidatePath('/dashboard/invoices');
    // 将重新验证 /dashboard/invoices 路径，并从服务器获取新数据
    // 将用户重定向回页面 /dashboard/invoices
    redirect('/dashboard/invoices');
}

//修改数据
// Use Zod to update the expected types 使用 Zod 验证类型。
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    // 将金额转换为美分。
    const amountInCents = amount * 100;
    // 将变量传递给 SQL 查询。
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
    // 调用 revalidatePath 以清除客户端缓存并发出新的服务器请求。
    revalidatePath('/dashboard/invoices');
    // 调用 redirect 以将用户重定向到发票的页面。
    redirect('/dashboard/invoices');
}

// 删除数据
export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    // 调用 revalidatePath 以清除客户端缓存并发出新的服务器请求。
    revalidatePath('/dashboard/invoices');
}
