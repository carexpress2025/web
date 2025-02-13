import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required.' },
      { status: 400 },
    );
  }

  const existingUser = await prisma.accounts.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: 'Email already exists.' },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const account = await prisma.accounts.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(account, { status: 201 });
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.message.includes('Database error')) {
        statusCode = 503;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
