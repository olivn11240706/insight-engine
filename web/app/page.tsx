'use client';

import React from 'react';

export default function Page() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Insight Engine 已上线</h1>
      <p>如果你能看到这个页面，说明路由已经通了！</p>
      {/* 暂时注释掉复杂的业务组件，先跑通路由 */}
    </div>
  );
}