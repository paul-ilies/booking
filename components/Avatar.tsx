"use client";
import React from "react";
import Image from "next/image";

const Avatar = ({ src }: { src?: string | null | undefined }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="avatar"
      src={src || "/placeholder.png"}
    />
  );
};

export default Avatar;
