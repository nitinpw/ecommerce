"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/zodSchema"; 
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/Application/ButtonLoading";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // React Hook Form + Zod setup
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  
  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.message || "Something went wrong!");
        setError(result?.message);
        setLoading(false);
        return;
      }

      toast.success("Registration successful!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err) {
      toast.error("Network error, please try again.");
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black overflow-hidden transition-colors duration-300">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Decorative blobs */}
      <div
        className="absolute bg-purple-900/40 blur-3xl rounded-full"
        style={{
          width: "25vw",
          height: "25vw",
          minWidth: 160,
          minHeight: 160,
          maxWidth: 420,
          maxHeight: 420,
          left: "-8vw",
          top: "-6vw",
        }}
      />
      <div
        className="absolute bg-blue-900/30 blur-3xl rounded-full"
        style={{
          width: "19vw",
          height: "19vw",
          minWidth: 110,
          minHeight: 110,
          maxWidth: 320,
          maxHeight: 320,
          right: "-7vw",
          bottom: "-5vw",
        }}
      />

      <Card
        className="
          relative z-10
          w-[95vw] max-w-[430px] md:max-w-md lg:max-w-lg 2xl:max-w-xl
          min-h-[500px] xs:min-h-[560px]
          rounded-2xl border-none shadow-xl backdrop-blur-lg
          bg-linear-to-br from-gray-900 to-black text-white
          flex flex-col justify-center
          px-4 py-8
          md:px-8 md:py-10
          2xl:px-16 2xl:py-14
        "
      >
        <CardHeader className="flex flex-col items-center gap-2 pt-4 pb-2">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-linear-to-tr from-pink-600 via-purple-600 to-blue-600 shadow-lg mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" className="w-8 h-8 text-white">
              <path stroke="currentColor" strokeWidth="2" d="M6.5 7h17l-2 11.5a2 2 0 01-2 1.5H11a2 2 0 01-2-1.5L3.5 7M11 20a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z"/>
            </svg>
          </div>
          <CardTitle className="text-center text-2xl md:text-3xl font-extrabold tracking-tight">
            Create Your Account
          </CardTitle>
          <p className="text-sm md:text-base text-gray-400 text-center pt-1">
            Shop faster, save favorites, track orders!
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium text-gray-200">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your name"
                        className="rounded-xl px-4 py-2 bg-gray-950 border border-gray-800 text-white placeholder:text-gray-500 text-base md:text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium text-gray-200">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="rounded-xl px-4 py-2 bg-gray-950 border border-gray-800 text-white placeholder:text-gray-500 text-base md:text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium text-gray-200">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPass ? "text" : "password"}
                          placeholder="••••••••"
                          className="rounded-xl px-4 py-2 bg-gray-950 border border-gray-800 text-white placeholder:text-gray-500 text-base md:text-lg pr-12"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-gray-200 transition"
                          tabIndex={-1}
                          onClick={() => setShowPass((v) => !v)}
                        >
                          {showPass ? <LuEye /> : <LuEyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium text-gray-200">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirm ? "text" : "password"}
                          placeholder="Retype password"
                          className="rounded-xl px-4 py-2 bg-gray-950 border border-gray-800 text-white placeholder:text-gray-500 text-base md:text-lg pr-12"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-gray-200 transition"
                          tabIndex={-1}
                          onClick={() => setShowConfirm((v) => !v)}
                        >
                          {showConfirm ? <LuEye /> : <LuEyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loading ? (
                <ButtonLoading />
              ) : (
                <Button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl font-semibold text-lg md:text-xl bg-linear-to-tr from-pink-700 to-purple-700 shadow-lg hover:scale-[1.04] transition-transform"
                >
                  Create Account
                </Button>
              )}
            </form>
          </Form>

          <div className="flex justify-between items-center my-6">
            <Separator className="flex-1 bg-gray-800" />
            <span className="mx-4 text-xs md:text-sm text-gray-500">or</span>
            <Separator className="flex-1 bg-gray-800" />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 hover:bg-gray-800 text-base md:text-lg"
            >
              <span>🔒</span> Sign up with Google
            </Button>
            <Button
              as="a"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 border border-gray-800 text-pink-300 hover:bg-gray-800 text-base md:text-lg font-bold"
            >
              <span>🔙</span> <Link href="/auth/login">Back to Login</Link>
            </Button>
          </div>
        </CardContent>

        <CardFooter className="text-center text-xs md:text-sm text-gray-400 pb-2 pt-2">
          By creating an account, you agree to our{" "}
          <a href="/terms" className="underline hover:text-pink-400">
            terms & conditions
          </a>.
        </CardFooter>
      </Card>
    </div>
  );
}
