import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";


const guestRoutes = [
    "/login",
    "/sign-up",
    "/forgot-password",
    "/verify-email",
]
const protectedRoutes = [
    "/create-path",
    "/dashboard",
    "/settings",
]

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await auth.api.getSession({
        headers: request.headers
    })


    const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    // In guest routes we have all the routes, that a signed user should not be able to access
    // like: login, sign-up, verify-email (an user is logged in only after the email is verified) 
    if (session && isGuestRoute) {
        // TODO: change with 'dashoboard' if there will be one. 
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!session && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Specify the routes the middleware applies to
    matcher: [
        "/login",
        "/sign-up",
        "/forgot-password",
        "/verify-email",
        "/dashboard/:path*",
        "/create-path/:path*",
        "/settings/:path*",
    ],
};
