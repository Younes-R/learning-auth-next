import { verifyRefreshToken, verifyRoles } from "@/lib/utils";

export default async function Page() {
  await verifyRefreshToken();
  await verifyRoles(["teacher"]);
  return (
    <main>
      <h1>Teacher Page</h1>
      <p>This is a protected page: you need to be authenticated + have access right to get this page.</p>
    </main>
  );
}
