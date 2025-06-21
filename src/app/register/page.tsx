export default function Page() {
  return (
    <main>
      <h1>Register Page</h1>
      <form action="">
        <div>
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="first-name"
            required
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="last-name"
            required
          />
        </div>
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
          <button type="submit">Register</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </main>
  );
}
