import { NextResponse } from "next/server";
import cookie from 'cookie';
import guideList from '../../../../guide.json';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log(email, password);

    const user = guideList.find((user) => user.email === email);

    if (user && user.password === password) {
      // Encode email and password into a cookie (not recommended for production)
      const cookieValue = `${encodeURIComponent(email)}:${encodeURIComponent(password)}`;
      
      const response = NextResponse.json({ success: true, message: "Login successful" });

      response.headers.set('Set-Cookie', cookie.serialize('userToken', cookieValue, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax', 
        path: '/' 
      }));

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },{ status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },{ status: 500 });
  }
}
