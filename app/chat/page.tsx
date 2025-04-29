import Navbar from '../components/Navbar';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex h-[calc(100vh-10rem)] flex-col">
          {/* 头部 */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">智能数据对话</h1>
            <div className="flex space-x-2">
              <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                清除对话
              </button>
              <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                设置
              </button>
            </div>
          </div>
          
          {/* 聊天区域 */}
          <div className="flex-1 bg-white rounded-lg shadow-sm mb-4 overflow-auto p-4">
            <div className="space-y-4">
              {/* 系统消息 */}
              <div className="flex justify-center">
                <span className="px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                  今天 14:30
                </span>
              </div>
              
              {/* 欢迎消息 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                </div>
                <div className="ml-3 bg-gray-100 rounded-lg px-4 py-3 max-w-md">
                  <p className="text-sm text-gray-900">
                    您好！我是CircleGod智能助手。您可以通过自然语言询问我关于数据分析的问题，例如：
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-900 mt-2">
                    <li>分析过去30天的销售趋势</li>
                    <li>哪个产品在上个月销售最好？</li>
                    <li>用户增长率如何变化？</li>
                    <li>预测下个季度的收入</li>
                  </ul>
                </div>
              </div>
              
              {/* 用户消息 */}
              <div className="flex justify-end">
                <div className="bg-primary-600 rounded-lg px-4 py-3 max-w-md">
                  <p className="text-sm text-white">
                    帮我分析过去6个月的用户增长趋势，并生成可视化图表
                  </p>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-900 font-bold">
                    U
                  </div>
                </div>
              </div>
              
              {/* AI回复 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                </div>
                <div className="ml-3 space-y-4 max-w-2xl">
                  <div className="bg-gray-100 rounded-lg px-4 py-3">
                    <p className="text-sm text-gray-900">
                      以下是过去6个月的用户增长趋势分析：
                    </p>
                    <p className="text-sm text-gray-900 mt-2">
                      根据数据，过去6个月用户数量持续增长，平均月增长率为15.8%。最显著的增长发生在3月份，增长率达到了22.5%。4月份有轻微下降，但5月和6月又恢复了增长态势。
                    </p>
                  </div>
                  
                  {/* 图表区域 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">用户增长趋势 (过去6个月)</h3>
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">图表区域 - 这里将显示实际的数据可视化</p>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="text-xs text-primary-600 hover:text-primary-900">
                        导出CSV
                      </button>
                      <button className="text-xs text-primary-600 hover:text-primary-900">
                        下载图片
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg px-4 py-3">
                    <p className="text-sm text-gray-900">
                      您还需要对这些数据进行更深入的分析吗？例如：
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-900 mt-2">
                      <li>按地区或渠道细分用户增长</li>
                      <li>分析用户留存率</li>
                      <li>预测未来3个月的用户增长</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 输入区域 */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex">
              <input
                type="text"
                className="flex-1 rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600"
                placeholder="输入您的问题..."
              />
              <button className="ml-3 btn-primary">
                发送
              </button>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <div>使用 / 可以打开快捷菜单</div>
              <div>按 Shift + Enter 换行</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 