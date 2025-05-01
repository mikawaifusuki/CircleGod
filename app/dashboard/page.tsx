import React from 'react';
import Layout from '../components/Layout';
import DashboardList from './components/DashboardList';

export const metadata = {
  title: '仪表盘 - CircleGod',
  description: '管理您的数据仪表盘',
};

export default function DashboardPage() {
  return (
    <Layout title="我的仪表盘">
      <DashboardList />
    </Layout>
  );
} 