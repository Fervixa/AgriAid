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
      className='border-2 hover:bg-green-800/20 hover:-translate-y-2 duration-150 hover:cursor-pointer h-[50px] w-[130px] rounded-2xl'
    >
      Analyze Crop
    </button>
  );
};
