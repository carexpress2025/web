import { NextRequest, NextResponse } from 'next/server';
import { httpRequestDurationSeconds } from '@lib/metrics';

export const collectMetrics = async (
  req: NextRequest,
  next: () => Promise<NextResponse>,
) => {
  const method = req.method || 'UNKNOWN';
  const url = req.url || 'UNKNOWN';

  const start = Date.now();

  const response = await next();

  const responseTime = (Date.now() - start) / 1000;

  httpRequestDurationSeconds
    .labels(method, url, response.status.toString())
    .observe(responseTime);

  return response;
};
