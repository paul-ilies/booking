"use client";

import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from "../hooks/useFavourite";

interface HeartButtonProps {
  currentUser?: SafeUser | null;
  listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  currentUser,
  listingId,
}) => {
  const { hasFavorited, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavourite}
      className="relative hover:opacty:80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={`${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};

export default HeartButton;
