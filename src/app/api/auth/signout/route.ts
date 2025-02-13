import { NextRequest, NextResponse } from 'next/server';
import { signOut } from 'next-auth/react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    await signOut({ redirect: false });

    return NextResponse.json(
      { message: 'Successfully signed out' },
      { status: 200 },
    );
  } catch (error: unknown) {
    let errorMessage = 'Failed to sign out';
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
