import { getPostgresVersion } from "@/lib/database/dal";

export async function GET(request: Request) {
  try {
    const result = await getPostgresVersion();
    return Response.json({ status: 200, result });
  } catch (err) {
    console.error(err);
    return Response.json({ status: 500, err });
  }
}
