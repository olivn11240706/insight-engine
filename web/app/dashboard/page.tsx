'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // 只要一进首页，立刻强制跳转到 dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-stone-50">
      <div className="text-stone-400">Loading Insight Engine...</div>
    </div>
  );
}