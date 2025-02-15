import { NextRequest, NextResponse } from 'next/server';
import { collectDefaultMetrics, Registry } from 'prom-client';

const registry = new Registry();

collectDefaultMetrics({ register: registry });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GET(req: NextRequest): NextResponse {
  return NextResponse.json(registry.metrics(), {
    headers: {
      'Content-Type': registry.contentType,
    },
  });
}
