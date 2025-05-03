"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg shadow-md w-1/3 text-center">
        <h1 className="text-3xl font-boldmb-4">Not Found</h1>
        <p className="text-destructive">
          Could not found that you have resourses
        </p>
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

export default NotFound;
