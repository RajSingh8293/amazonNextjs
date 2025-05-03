import React from "react";

const LoadingPage = async () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-[tomato] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingPage;
