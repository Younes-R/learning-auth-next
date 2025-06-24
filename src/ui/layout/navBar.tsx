import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { ResponsiveBar } from "./responsiveBar";

export default async function NavBar() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  let payload: any;
  try {
    payload = jwt.verify(refreshToken!, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error: any) {
    console.error("No JWT token found.");
  }
  const role = payload?.role;

  return (
    <ResponsiveBar
      payload={payload}
      role={role}
    />
  );
}
