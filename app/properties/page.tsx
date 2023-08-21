import getCurrentUser from "@/actions/getCurrentUser";
import { getListings } from "@/actions/getListings";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import PropertiesClient from "./PropertiesClient";

export default async function Properties() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }
  const listings = await getListings({ userId: currentUser.id });
  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks lime you havent reserved any properties"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
}
