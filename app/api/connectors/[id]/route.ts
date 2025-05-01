import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

// 获取单个数据连接器
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const connector = await prisma.dataConnector.findUnique({
      where: { id },
    });

    if (!connector) {
      return NextResponse.json(
        { error: 'Connector not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(connector);
  } catch (error) {
    console.error('Error fetching connector:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connector' },
      { status: 500 }
    );
  }
}

// 更新数据连接器
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, type, config } = body;

    // 基本验证
    if (!name || !type || !config) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const connector = await prisma.dataConnector.update({
      where: { id },
      data: {
        name,
        type,
        config,
      },
    });

    return NextResponse.json(connector);
  } catch (error) {
    console.error('Error updating connector:', error);
    return NextResponse.json(
      { error: 'Failed to update connector' },
      { status: 500 }
    );
  }
}

// 删除数据连接器
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.dataConnector.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting connector:', error);
    return NextResponse.json(
      { error: 'Failed to delete connector' },
      { status: 500 }
    );
  }
} 