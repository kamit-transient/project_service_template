// // app/api/token/route.ts
// "use server"
// import { COOKIE_ID_TOKEN } from '../utils/app.constants';
// import { jwtVerify, createRemoteJWKSet } from 'jose';


// const jwks = createRemoteJWKSet(new URL(process.env.JWKS_URL!));

// export async function ManageSession({ request, cookieStore, NextResponse }: { request: any, cookieStore: any, NextResponse: any }) {
//     // Ensure only POST requests are handled
//     try {
//         // Parse the request body
//         const { token, cleanup } = await request.json();

//         if (!token && !cleanup) {
//             console.log("no token or cleanup... 401");

//             return NextResponse.json(
//                 { message: 'Token is required' },
//                 { status: 400 }
//             );
//         }

//         // Validate input
//         if (token) {
//             const { payload } = await jwtVerify(token, jwks, {
//                 issuer: process.env.AUTH_PROVDER_ENDPOINT!,
//             });

//             if (!payload) {
//                 return NextResponse.json(
//                     { message: 'Invalid or expired token' },
//                     { status: 401 }
//                 );
//             }

//             // Set HTTP-only cookie
//             cookieStore.set(COOKIE_ID_TOKEN, token, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: 'strict',
//                 // maxAge: 3600, // 1 hour
//                 path: '/',
//             });

//         } else {
//             cookieStore.delete(COOKIE_ID_TOKEN);
//         }




//         // Redirect to home page or return success response
//         // return NextResponse.redirect(new URL('/', request.url));
//         return NextResponse.json({ message: true }, { status: 200 });

//     } catch (error) {
//         console.error('Token validation error:', error);

//         return NextResponse.json(
//             { message: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }