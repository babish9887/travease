import { NextResponse } from "next/server";
import cookie from 'cookie';
import guideList from '../../../../../guide.json';
import touristList from '../../../../../tourist.json'

export async function GET(request, context) {
      const id=context.params.id;

  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const userToken = cookies.userToken;

    if (userToken) {
      const [email, password] = userToken.split(':').map(decodeURIComponent);

      let user =null;

      if(id=="tourist"){
            user= touristList.find((user) => user.email);
      } else{
            user = guideList.find((user) => user.email);
      }
      console.log(user)
      if (user) {
            console.log(user)
        return NextResponse.json({ success: true, message: "User is logged in", user });
      } else {
        return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ success: false, message: "No session found" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
