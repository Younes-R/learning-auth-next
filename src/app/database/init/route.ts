import { initializeDataBase } from "@/lib/database/dal";

export async function GET() {
  try {
    const result = await initializeDataBase();
    return Response.json(result);
  } catch (err: any) {
    console.error(err.message);
    return Response.json(err);
  }
}
