export interface User {
  firstName: string;
  lastName: string;
  userType: "student" | "teacher";
  email: string;
  password: string;
}
