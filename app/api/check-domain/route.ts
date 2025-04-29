import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { add } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain name is required' },
        { status: 400 }
      );
    }

    // Clean up expired domains
    await prisma.domain.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    // Check if domain exists and is not expired
    const existingDomain = await prisma.domain.findUnique({
      where: {
        name: domain,
      },
    });

    if (existingDomain) {
      return NextResponse.json(
        { available: false, message: 'Domain is already taken' },
        { status: 200 }
      );
    }

    // Domain is available, reserve it
    const expiresAt = add(new Date(), { hours: 48 });
    await prisma.domain.create({
      data: {
        name: domain,
        expiresAt,
      },
    });

    return NextResponse.json(
      { available: true, message: 'Domain is available' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking domain:', error);
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    );
  }
} 