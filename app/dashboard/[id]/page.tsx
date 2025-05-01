import React from 'react';
import Layout from '@/app/components/Layout';
import DashboardViewer from './components/DashboardViewer';

interface DashboardPageParams {
  id: string;
}

export default function DashboardPage({ params }: { params: DashboardPageParams }) {
  const { id } = params;

  return (
    <Layout title="仪表盘详情">
      <DashboardViewer dashboardId={id} />
    </Layout>
  );
} 