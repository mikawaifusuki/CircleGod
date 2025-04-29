import Navbar from '../components/Navbar';

export default function VisualizationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">数据可视化中心</h1>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              创建新图表
            </button>
            <button className="btn-primary">
              导入数据
            </button>
          </div>
        </div>
        
        {/* 可视化类型选择 */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-3">选择可视化类型</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {visualizationTypes.map((type) => (
              <div key={type.id} className="flex flex-col items-center space-y-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <div className="h-12 w-12 flex items-center justify-center text-primary-600">
                  <span className="text-2xl">{type.icon}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{type.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 最近创建的可视化 */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">最近创建的可视化</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentVisualizations.map((visualization) => (
              <div key={visualization.id} className="card">
                <div className="aspect-w-16 aspect-h-9 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                  {/* 实际项目中这里会显示可视化的预览图 */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">图表预览</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">{visualization.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{visualization.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    更新于 {visualization.updatedAt}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-sm text-primary-600 hover:text-primary-900">
                      查看
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      编辑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 保存的查询和模板 */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">保存的查询和模板</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建者
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    更新时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savedQueries.map((query) => (
                  <tr key={query.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {query.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {query.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {query.creator}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {query.updatedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button className="text-primary-600 hover:text-primary-900">使用</button>
                        <button className="text-gray-500 hover:text-gray-700">编辑</button>
                        <button className="text-red-500 hover:text-red-700">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// 模拟数据
const visualizationTypes = [
  { id: 1, label: '折线图', icon: '📈' },
  { id: 2, label: '柱状图', icon: '📊' },
  { id: 3, label: '饼图', icon: '🍕' },
  { id: 4, label: '散点图', icon: '⚪' },
  { id: 5, label: '热力图', icon: '🟦' },
  { id: 6, label: '地图', icon: '🗺️' },
];

const recentVisualizations = [
  {
    id: 1,
    title: '销售数据月度趋势',
    description: '展示最近12个月的销售趋势变化',
    updatedAt: '2025-04-28',
  },
  {
    id: 2,
    title: '客户分布地图',
    description: '按地区显示客户分布情况',
    updatedAt: '2025-04-26',
  },
  {
    id: 3,
    title: '产品类别销售占比',
    description: '各产品类别销售额占总销售额的比例',
    updatedAt: '2025-04-25',
  },
];

const savedQueries = [
  {
    id: 1,
    name: '月度销售报告',
    type: '报表模板',
    creator: '张三',
    updatedAt: '2025-04-28',
  },
  {
    id: 2,
    name: '用户行为分析',
    type: 'SQL查询',
    creator: '李四',
    updatedAt: '2025-04-25',
  },
  {
    id: 3,
    name: '产品性能跟踪',
    type: '数据看板',
    creator: '王五',
    updatedAt: '2025-04-20',
  },
]; 