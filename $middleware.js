import { NextResponse } from 'next/server'

export function middleware(request) {
  /*return NextResponse.json({message: 'from middleware'}, {
    status: 200
  })*/
  // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}