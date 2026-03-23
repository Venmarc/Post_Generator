import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase environment variables are missing! Middleware will skip auth checks.");
      return NextResponse.next({ request });
    }

    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very
    // hard to debug issues with sessions being lost.
    const { data: { user } } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl

    // Protected routes: /dashboard, /create-pipeline, /analytics, /settings
    const isProtectedRoute = 
      pathname.startsWith('/dashboard') || 
      pathname.startsWith('/create-pipeline') || 
      pathname.startsWith('/analytics') || 
      pathname.startsWith('/settings')

    // Auth routes: /auth/*
    const isAuthRoute = pathname.startsWith('/auth')
    const isLandingPage = pathname === '/'

    if (!user && isProtectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      const response = NextResponse.redirect(url)
      // Copy cookies from supabaseResponse to ensure session isn't lost
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        response.cookies.set(cookie.name, cookie.value, cookie);
      });
      return response
    }

    if (user && (isAuthRoute || isLandingPage)) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      const response = NextResponse.redirect(url)
      // Copy cookies from supabaseResponse to ensure session isn't lost
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        response.cookies.set(cookie.name, cookie.value, cookie);
      });
      return response
    }

    return supabaseResponse
  } catch (error) {
    console.error("DEBUG: Middleware error:", error);
    // In case of any fatal error, allow the request to proceed but log it.
    // This prevents the whole site from going down (500 Error).
    return NextResponse.next({ request });
  }
}
