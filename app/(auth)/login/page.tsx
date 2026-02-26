import { Suspense } from "react";
import LoginForm from "./_components/loginForm";

function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-[#FF62FC]">Loading...</div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
