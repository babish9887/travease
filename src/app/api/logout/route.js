import { NextResponse } from "next/server";
import cookie from 'cookie';

export async function POST(request) {
  try {
    // Assuming you want to clear the user token cookie to log out
    const response = NextResponse.json({ success: true }, { status: 200 });
    
    response.headers.set('Set-Cookie', cookie.serialize('userToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // Set cookie to expire immediately
      sameSite: 'lax',
      path: '/'
    }));

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
