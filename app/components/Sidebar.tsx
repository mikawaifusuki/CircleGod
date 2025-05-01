import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  RiDashboardLine, 
  RiDatabase2Line, 
  RiBarChartBoxLine, 
  RiRobot2Line,
  RiFileList3Line,
  RiMessage2Line
} from 'react-icons/ri';

const navigation = [
  { name: '仪表盘', href: '/dashboard', icon: RiDashboardLine },
  { name: '数据连接器', href: '/connectors', icon: RiDatabase2Line },
  { name: '可视化', href: '/visualizations', icon: RiBarChartBoxLine },
  { name: '分析模型', href: '/models', icon: RiRobot2Line },
  { name: '报表', href: '/reports', icon: RiFileList3Line },
  { name: '智能对话', href: '/chat', icon: RiMessage2Line },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white w-64 flex-shrink-0 border-r border-gray-200">
      <div className="p-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-blue-600">CircleGod</span>
        </Link>
      </div>
      <nav className="mt-5 flex-1 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                ${isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 