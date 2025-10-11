"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const Analyzecrop = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <button
      onClick={handleClick}
      className="mr-10 text-medium cursor-pointer text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
    >
      Analyze Crop +
    </button>
  );
};
