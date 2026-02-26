"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { aclonica } from "@/lib/utils";
import { login, loginRequestSchema } from "@/lib/auth";
import { ZodError } from "zod";
import axios from "axios";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      const from = searchParams.get("from");
      const redirectPath = from && from.startsWith("/") ? from : "/";
      router.push(redirectPath);
      router.refresh();
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        const msg =
          (err.response?.data as { detail?: string })?.detail ??
          err.message ??
          "Login failed.";
        setError(msg);
      } else {
        setError("Login failed. Please try again.");
      }
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const payload = loginRequestSchema.parse({
        email_or_phone_number: emailOrPhone,
        password,
      });
      loginMutation.mutate(payload);
    } catch (err) {
      if (err instanceof ZodError) {
        const msg = err.issues.map((e: { message: string }) => e.message).join(". ");
        setError(msg);
      }
    }
  }

  return (
    <>
      <header className="flex justify-between items-center ">
        <Image src="/headerL.png" alt="logo" width={800} height={418.53} />
        <Image src="/headerR.png" alt="logo" width={800} height={418.53} />
      </header>
      <main>
        <Image
          className="fixed left-0 top-0"
          src="/loginL.png"
          alt="loginL"
          width={100}
          height={74.97}
        />

        <Image
          className="fixed right-0 top-0"
          src="/loginR.png"
          alt="loginR"
          width={100}
          height={74.97}
        />
        <div className="px-[46px] pt-[45px] w-full">
          <Image
            className="pl-8"
            src="/logo.png"
            alt="logo"
            width={280.74}
            height={28.24}
          />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <h2
              className={`text-4xl p text-[#FF62FC] pr-10 ${aclonica.className}`}
            >
              LOGIN
            </h2>
            <div className="flex flex-col gap-5 mt-6">
              <p></p>
              <input
                className="w-[380px] h-[77px] border border-[#E9A3FB] rounded-md p-2 outline-none"
                type="text"
                placeholder="Email or phone number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                disabled={loginMutation.isPending}
                autoComplete="username"
              />
              <p></p>
              <input
                className="w-[380px] h-[77px] border border-[#E9A3FB] rounded-md p-2 outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginMutation.isPending}
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="mt-2 text-red-400 text-sm text-center w-[380px]">
                {error}
              </p>
            )}
            <div className="mt-12 flex items-center justify-center ">
              <div className="relative w-[277px] h-[77px] cursor-pointer ">
                <Image
                  src="/loginButton.png"
                  alt="login button"
                  fill
                  className="object-cover"
                />
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className={`absolute inset-0 flex items-center justify-center text-2xl text-white disabled:opacity-70 ${aclonica.className}`}
                >
                  {loginMutation.isPending ? "..." : "LOGIN"}
                </button>
              </div>
            </div>
            <Image
              src="/underLogin.png"
              alt="login button"
              width={322.42}
              height={43.11}
            />
          </form>
        </div>
      </main>
      <footer className="flex justify-center items-center">
        <Image
          className="fixed bottom-0"
          src="/footer.png"
          alt="logo"
          width={1710}
          height={418.53}
        />
      </footer>
    </>
  );
};

export default LoginForm;
