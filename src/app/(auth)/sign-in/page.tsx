"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormFooter from "@/components/shared/FormFooter";
import { toast } from "sonner";
const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.ok) {
      router.push(res.url || callbackUrl);
      toast.success("Sign in successfully");
    } else {
      setError("Invalid credentials");
    }
  };
  return (
    <div className="w-full">
      <Card className=" border-none bg-white rounded shadow-md w-full">
        <CardHeader>
          <CardTitle className="text-gray-600 text-xl">
            Sign in or create account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border mb-4 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border mb-6 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full text-black bg-yellow-500 hover:bg-yellow-400 "
              >
                Sign In
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div>
            Don&apos;t have an account?{" "}
            <Link
              className=" font-semibold text-blue-600 hover:underline"
              href="/sign-up"
            >
              sign-up
            </Link>
          </div>
          <FormFooter />
        </CardFooter>
      </Card>
    </div>
  );
};
export default SignInPage;
