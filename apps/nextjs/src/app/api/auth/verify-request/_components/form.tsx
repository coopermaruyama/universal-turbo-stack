"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface VerifyRequestPageProps {
  initialCode?: string;
  logo?: string;
  email?: string;
  callbackUrl?: string;
  onClick?: (code: string) => void;
}

export default function VeryifyRequestForm(props: VerifyRequestPageProps) {
  const { initialCode = "", logo, email = "", callbackUrl = "" } = props;
  const [code, setCode] = useState(initialCode);
  const getUrl = () => {
    const params = new URLSearchParams();
    if (email) {
      params.set("email", email);
    }
    if (code) {
      params.set("token", code);
    }
    if (callbackUrl) {
      params.set("callbackUrl", callbackUrl);
    }
    const nextUrl = `/api/auth/callback/sendgrid?${params.toString()}`;
    return nextUrl;
  };
  // const nextUrl =  `/api/auth/callback/sendgrid?callbackUrl=${encodeURIComponent(callbackUrl || '')}&email=${encodeURIComponent(email || '')}`
  return (
    <div className="card">
      {logo && <img src={logo} alt="Logo" className="logo" />}
      <h1>Check your email</h1>
      {/* <form action={handleSubmit}> */}
      {/* // /api/auth/callback/sendgrid?callbackUrl=http%3A%2F%2F192.168.1.64%3A3000&token=0bd69674213790a22ad7c75929ccc2f87cdf2a983de7b6fdf23f8cfbbe7e34f5&email=me%40cooperm.com */}
      <p>Type the code</p>
      <p>
        <input
          type="text"
          name="token"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {/* <a href={url.href}>Resend</a> */}
      </p>
      {/* <button
          // type="submit"
          className="button"
          onClick={() => {
            props.onClick(code)
          }}
        >
          Verify
        </button> */}
      <Link
        href={getUrl()}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = getUrl();
        }}
      >
        Verify
      </Link>
      {/* </form> */}
    </div>
  );
}
