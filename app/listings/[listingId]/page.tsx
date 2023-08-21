import getListingById from "@/actions/getListingById";
import ListingClient from "./ListingClient";
import getReservations from "@/actions/getReservations";
import getCurrentUser from "@/actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import { getUserListingById } from "@/actions/getUserListingById";

interface IParams {
  listingId: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const listingCreatedByUser = await getUserListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
        listingCreatedByUser={listingCreatedByUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
