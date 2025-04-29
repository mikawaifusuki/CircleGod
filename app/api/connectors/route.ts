import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const connectors = await prisma.dataConnector.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(connectors);
  } catch (error) {
    console.error("Error fetching connectors:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, type, config } = await request.json();

    if (!name || !type || !config) {
      return NextResponse.json(
        { message: "Name, type, and config are required" },
        { status: 400 }
      );
    }

    const connector = await prisma.dataConnector.create({
      data: {
        name,
        type,
        config,
        userId: session.user.id,
      },
    });

    return NextResponse.json(connector, { status: 201 });
  } catch (error) {
    console.error("Error creating connector:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 