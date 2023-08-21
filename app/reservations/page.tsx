import React from "react";

import ReservationsClient from "./ReservationsClient";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

const Reservations = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }
  const reservations = await getReservations({
    authorId: currentUser?.id,
  });

  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="It looks you dont have any reservations on your properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default Reservations;
