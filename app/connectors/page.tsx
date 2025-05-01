import React from 'react';
import Layout from '../components/Layout';
import ConnectorList from './components/ConnectorList';

export const metadata = {
  title: '数据连接器 - CircleGod',
  description: '管理您的数据连接器',
};

export default function ConnectorsPage() {
  return (
    <Layout title="数据连接器">
      <ConnectorList />
    </Layout>
  );
} 