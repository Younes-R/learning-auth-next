import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jwt from "jsonwebtoken";

export async function verifyRefreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    console.error("No refreshToken found.");
    redirect("/login");
  }
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error: any) {
    console.error(error.message);
    redirect("/login");
  }
}
