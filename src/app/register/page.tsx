import { register } from "@/lib/actions";

export default function Page() {
  return (
    <main>
      <h1>Register Page</h1>
      <form action={register}>
        <div>
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="first-name"
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="last-name"
          />
        </div>
        <div>
          <label>User Type:</label>
          <div>
            <label htmlFor="user-type-student">Student</label>
            <input
              type="radio"
              name="userType"
              id="user-type-student"
              value="student"
            />
            <label htmlFor="user-type-teacher">Teacher</label>
            <input
              type="radio"
              name="userType"
              id="user-type-teacher"
              value="teacher"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <button type="submit">Register</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </main>
  );
}
