import { redirect } from 'next/navigation';

export default function RootPage() {
  // 直接在服务器端重定向，这是 Next.js 官方最推荐的做法
  redirect('/dashboard');
}