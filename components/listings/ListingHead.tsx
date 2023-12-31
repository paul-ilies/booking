"use client";
import React from "react";
import Heading from "../Heading";
import Image from "next/legacy/image";
import HeartButton from "../HeartButton";
import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import { shimmer } from "@/utils/Shimmer";
import { toBase64 } from "@/utils/convertShimmer";
interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
  listingCreatedByUser?: string | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
  listingCreatedByUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          alt="Image"
          layout="fill"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          className="object-cover w-full"
        />
        {id !== listingCreatedByUser && (
          <div className="absolute top-5 right-5">
            <HeartButton listingId={id} currentUser={currentUser} />
          </div>
        )}
      </div>
    </>
  );
};

export default ListingHead;
