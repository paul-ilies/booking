"use client";

import React, { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import { SafeListing, SafeUser } from "@/types";
import toast from "react-hot-toast";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";

interface PropertiesClient {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClient> = ({
  currentUser,
  listings,
}) => {
  const [deletinId, setDeletingId] = useState("");
  const router = useRouter();
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing Deleted");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Properties" subtitle="List of properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletinId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
