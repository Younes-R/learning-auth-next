import Link from "next/link";
import { signOut } from "@/lib/actions";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

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
    <aside>
      <nav>
        {payload ? <span style={{ borderBottom: "2px solid #333" }}>{`Hello, ${payload.email} !`}</span> : null}
        <Link href="/">Home Page</Link>
        {payload && role === "student" ? <Link href="/student">Student Page</Link> : null}
        {payload && role === "teacher" ? <Link href="teacher">Teacher Page</Link> : null}
      </nav>
      <nav>
        {payload ? null : <Link href="register">Register</Link>}
        {payload ? null : <Link href="login">Login</Link>}
        {payload ? <button onClick={signOut}>Sign Out</button> : null}
      </nav>
    </aside>
  );
}
