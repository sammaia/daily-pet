import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run auth session refresh on protected routes
  if (pathname.startsWith('/dashboard')) {
    const response = await updateSession(request);
    return response;
  }

  // Public routes don't need session refresh
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
