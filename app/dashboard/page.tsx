import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">智能分析仪表盘</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* 关键指标卡片 */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-2">数据集总数</h2>
            <p className="text-3xl font-bold text-primary-600">8</p>
            <p className="text-sm text-gray-500 mt-1">较上月增长 25%</p>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-2">分析任务数</h2>
            <p className="text-3xl font-bold text-primary-600">42</p>
            <p className="text-sm text-gray-500 mt-1">本周完成 12 个</p>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-2">智能对话次数</h2>
            <p className="text-3xl font-bold text-primary-600">156</p>
            <p className="text-sm text-gray-500 mt-1">平均每日 20 次</p>
          </div>
        </div>
        
        {/* 最近分析结果 */}
        <div className="card mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">最近分析结果</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分析名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    销售数据趋势分析
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2025-04-28
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      已完成
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">查看</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    用户行为分析
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2025-04-27
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      已完成
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">查看</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 快速操作按钮 */}
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">新建分析任务</button>
          <button className="btn-secondary">导入数据集</button>
          <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            查看所有报告
          </button>
        </div>
      </main>
    </div>
  );
} 