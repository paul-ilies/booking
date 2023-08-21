"use client";

import React, { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SafeReservation, SafeUser } from "@/types";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";

interface TripsClientProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}

const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const [deletinId, setDeletingId] = useState("");
  const router = useRouter();
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Canceled");
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
      <Heading
        title="Trips"
        subtitle="Where you've been and were you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((res) => {
          return (
            <ListingCard
              key={res.id}
              data={res.listing}
              reservation={res}
              actionId={res.id}
              onAction={onCancel}
              disabled={deletinId === res.id}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
