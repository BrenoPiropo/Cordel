import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Tenta pegar o token dos cookies
  const token = request.cookies.get('token')?.value;

  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Se tentar acessar o dashboard sem token, manda para o login
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se já estiver logado e tentar ir para o login, manda para o dashboard
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configura em quais caminhos o middleware deve agir
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};