import { NextResponse } from "next/server";
import cookie from 'cookie';
import guideList from '../../../../guide.json';

export async function GET(request) {
  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const userToken = cookies.userToken;

    if (userToken) {
      const [email, password] = userToken.split(':').map(decodeURIComponent);

      const user = guideList.find((user) => user.email === email && user.password === password);

      if (user) {
        return NextResponse.json({ success: true, message: "User is logged in" });
      } else {
        return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ success: false, message: "No session found" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
