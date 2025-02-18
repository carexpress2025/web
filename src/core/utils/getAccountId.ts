import { NextRequest } from 'next/server';

export const parseIdFromRequest = (req: NextRequest): number | null => {
  const idString = req.nextUrl.pathname.split('/').pop();
  if (!idString) return null;
  const accountId = Number(idString);
  return isNaN(accountId) ? null : accountId;
};
