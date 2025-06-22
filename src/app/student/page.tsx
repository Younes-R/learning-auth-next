import { verifyRefreshToken } from "@/lib/utils";

export default async function Page() {
  await verifyRefreshToken();

  return (
    <main>
      <h1>Student Page</h1>
      <p>This is a protected page: you need to be authenticated + have access right to get this page.</p>
    </main>
  );
}
