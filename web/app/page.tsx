'use client';

import { Suspense } from 'react';
// 注意：这里直接导入你之前 dashboard 的组件内容
// 如果你已经把 dashboard 的代码贴过来了，请确保下面的导出名称正确
import DashboardPage from './dashboard/page'; 

export default function RootPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}