"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error("Error caught in error.tsx:", error);
  }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg shadow-md w-1/3 text-center">
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-destructive">{error.message}</p>
        <Button variant="outline" className="mb-4" onClick={() => reset()}>
          Try again
        </Button>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = "/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
