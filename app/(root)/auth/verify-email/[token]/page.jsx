"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuCheck, LuMailWarning, LuLoader } from "react-icons/lu";
import Link from "next/link";



const EmailVerification = ({ params }) => {
  const { token } = React.use(params); // ✅ Correct - unwrap Promise
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    const verify = async () => {
      try {
        // Call backend API to verify email
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token }),
        });
        const verificationResponse = await res.json();
        if (verificationResponse.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="max-w-md w-full mx-2 rounded-2xl shadow-2xl bg-linear-to-br from-gray-900 to-black py-8 px-6">
        <CardHeader className="flex flex-col items-center gap-2">
          {status === "loading" && (
            <>
              <LuLoader className="text-5xl text-purple-500 animate-spin mb-4" />
              <CardTitle className="text-2xl text-white">
                Verifying your email...
              </CardTitle>
            </>
          )}
          {status === "success" && (
            <>
              <LuCheck className="text-5xl text-green-400 mb-4" />
              <CardTitle className="text-2xl text-white">
                Email verified!
              </CardTitle>
            </>
          )}
          {status === "error" && (
            <>
              <LuMailWarning className="text-5xl text-red-400 mb-4" />
              <CardTitle className="text-2xl text-white">
                Verification failed
              </CardTitle>
            </>
          )}
        </CardHeader>
        <CardContent className="text-center text-gray-300 mt-4">
          {status === "loading" && (
            <p>
              Please wait while we verify your email link...
            </p>
          )}
          {status === "success" && (
            <>
              <p>
                Your email has been verified successfully.<br />
                You can now login and start shopping!
              </p>
              <Link href="/auth/login">
              <Button
                className="mt-6 w-full bg-linear-to-tr from-green-600 to-purple-700 text-white font-semibold rounded-lg py-3 text-base"
                as="a"
                href="/auth/login"
              >Go to Login</Button>
              </Link>
            </>
          )}
          {status === "error" && (
            <>
              <p>
                The verification link is invalid, expired, or already used.<br />
                Please request a new verification email or contact support.
              </p>
              <Link href="/auth/register">
              <Button
                className="mt-6 w-full bg-linear-to-tr from-red-600 to-purple-700 text-white font-semibold rounded-lg py-3 text-base"
                as="a"
                href="/auth/register"
              >Sign up again</Button>
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
