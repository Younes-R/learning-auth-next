"use client";
import Link from "next/link";
import { signOut } from "@/lib/actions";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export function ResponsiveBar(props: { payload: any; role: string }) {
  const [isToggled, setIsToggled] = useState(false);
  const pathname = usePathname();
  const width = useWindowWidth();
  useEffect(() => {
    if (width > 768) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }, [width]);
  useEffect(() => {
    setIsToggled(false);
  }, [pathname]);
  return (
    <>
      <span>
        <button
          onClick={() => {
            setIsToggled(!isToggled);
            console.log("setIsToggled run!");
          }}
        >
          <div></div>
        </button>
      </span>
      <aside
        style={{
          display: isToggled ? "flex" : "none",
        }}
      >
        <nav>
          <Link href="/">Home Page</Link>
          {props.payload && props.role === "student" ? <Link href="/student">Student Page</Link> : null}
          {props.payload && props.role === "teacher" ? <Link href="teacher">Teacher Page</Link> : null}
        </nav>
        <nav>
          {props.payload ? null : <Link href="register">Register</Link>}
          {props.payload ? null : <Link href="login">Login</Link>}
          {props.payload ? <button onClick={signOut}>Sign Out</button> : null}
        </nav>
      </aside>
    </>
  );
}
