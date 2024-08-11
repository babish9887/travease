import { NextResponse } from "next/server";
import cookie from 'cookie';
import guideList from '../../../../guide.json';
import touristList from '../../../../tourist.json'

export async function GET(request) {
  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const userToken = cookies.userToken;

    if (userToken) {
      const [email, password] = userToken.split(':').map(decodeURIComponent);
      const totalUsers=guideList.concat(touristList)

      const user = totalUsers.find((user) => user.email === email && user.password === password);

      if (user) {
        return NextResponse.json({ success: true, message: "User is logged in", user });
      } else {
        return NextResponse.json({ success: false, message: "Invalid session" }, { status: 200 });
      }
    } else {
      return NextResponse.json({ success: false, message: "No session found" }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
