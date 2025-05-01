import React from 'react';
import Layout from '@/app/components/Layout';
import ConnectorForm from '../components/ConnectorForm';

export const metadata = {
  title: '创建数据连接器 - CircleGod',
  description: '创建新的数据连接器',
};

export default function NewConnectorPage() {
  return (
    <Layout title="创建数据连接器">
      <ConnectorForm />
    </Layout>
  );
} 