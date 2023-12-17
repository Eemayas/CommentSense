import UserLogin from "@/lib/model/userLogin.model";
import { connectToDB } from "@/lib/mongoose";
import credentials from "next-auth/providers/credentials";
import { useDispatch } from "react-redux";
const bcrypt = require("bcrypt");
const Authorize = async (credentials: any, req: any) => {
  const dispatch = useDispatch();
  try {
    connectToDB();
    if (!credentials?.password || !credentials?.email) return null;

    const user = await UserLogin.findOne({
      email: credentials?.email,
    });

    if (!user) {
      //   dispatch({ type: LOGIN_ERROR, payload: "No User Found" });
      return null;
    }

    const passwordMatch = await bcrypt.compare(
      credentials?.password,
      user.password
    );

    if (passwordMatch) {
      console.log(`User Login:${user}`);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default Authorize;
