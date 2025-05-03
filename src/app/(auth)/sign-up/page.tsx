"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => router.push("/sign-in"), 2000);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create new account
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border mb-4 rounded"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border mb-4 rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border mb-6 rounded"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}
        <Button
          type="submit"
          className="w-full rounded-full text-black bg-yellow-500 hover:bg-yellow-400 "
        >
          Create account
        </Button>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
