import { login } from "@/lib/actions";

export default function Page() {
  return (
    <main>
      <h1>Login Page</h1>
      <form action={login}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </main>
  );
}
