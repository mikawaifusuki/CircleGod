import { NextResponse } from "next/server";
import { prisma } from '@/lib/api/prisma';

// 获取所有数据连接器
export async function GET() {
  try {
    const connectors = await prisma.dataConnector.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(connectors);
  } catch (error) {
    console.error('Error fetching connectors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connectors' },
      { status: 500 }
    );
  }
}

// 创建新的数据连接器
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, config, userId } = body;

    // 基本验证
    if (!name || !type || !config || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const connector = await prisma.dataConnector.create({
      data: {
        name,
        type,
        config,
        userId,
      },
    });

    return NextResponse.json(connector, { status: 201 });
  } catch (error) {
    console.error('Error creating connector:', error);
    return NextResponse.json(
      { error: 'Failed to create connector' },
      { status: 500 }
    );
  }
} 