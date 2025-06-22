"use server";
import { revalidatePath } from "next/cache";
import * as z from "zod/v4";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { createUser, getUserByEmail, isUserExistsWith } from "./database/dal";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function register(formData: FormData) {
  console.log(formData);

  const User = z.object({
    firstName: z.string().nonempty().trim(),
    lastName: z.string().nonempty().trim(),
    userType: z.enum(["student", "teacher"]),
    email: z.email().nonempty().trim(),
    password: z.string().nonempty().trim(),
  });

  const result = User.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    userType: formData.get("userType"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!result.success) {
    console.log(result.error.message);
    //revalidatePath("/register");
    //zod error
    return; // { error: "Entries not validated." };
  }
  console.log("No errors!\n");
  const user = result.data;
  const isDublicate = await isUserExistsWith(user.email); // this can throw an error
  if (isDublicate) return; //{ error: "A user already exists with this email." }; // we need to handle this correctly
  const refreshToken = jwt.sign(
    {
      email: user.email,
      role: user.userType,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "1m" }
  );

  const hashedPassword = await bcrypt.hash(user.password, 10);

  try {
    await createUser({ ...user, password: hashedPassword });
  } catch (err: any) {
    console.error(err.message);
    return; // { error: err.message };
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
  });

  console.log("Server Aciton run and finished!");

  redirect(`/${user.userType}`);
}

export async function login(formData: FormData) {
  console.log(formData);

  const User = z.object({
    email: z.email().nonempty().trim(),
    password: z.string().nonempty().trim(),
  });

  const result = User.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    console.log(result.error.message);
    //revalidatePath("/register");
    //zod error
    return; // { error: "Entries not validated." };
  }
  console.log("No errors!\n");
  const user = result.data;
  let userInDb;
  try {
    userInDb = await getUserByEmail(user.email);
  } catch (err: any) {
    console.error(err.message);
    return; //return the error here
  }

  if (!userInDb) {
    console.error("No user with this email.");
    return; // return an error to the user
  }

  const isPasswordCorrect = await bcrypt.compare(user.password, userInDb.password);
  if (!isPasswordCorrect) {
    console.error("Password incorrect.");
    return; // return an error to the user
  }

  const refreshToken = jwt.sign(
    {
      email: userInDb.email,
      role: userInDb.userType,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "1m" }
  );

  const cookieStore = await cookies();
  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
  });
  console.log(userInDb);
  console.log("Server Aciton run and finished!");

  redirect(`/${userInDb.user_type}`);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("refreshToken");
  redirect("/login");
}
