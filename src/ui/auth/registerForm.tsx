"use client";
import { register } from "@/lib/actions";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, undefined);

  return (
    <form action={formAction}>
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
      <div
        style={{
          // backgroundColor: "gold",
          justifyContent: "flex-end",
          gap: "1em",
        }}
      >
        <button type="submit">Register</button>
        <button type="reset">Reset</button>
      </div>
      {state ? <p style={{ color: "red" }}>{state}</p> : null}
    </form>
  );
}
