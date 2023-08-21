import client from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface IParams {
  listingId: string;
}

export async function getUserListingById(params: IParams) {
  try {
    const { listingId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser) return;
    const listingCreatedByUser = await client.listing.findFirst({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });
    if (!listingCreatedByUser) return null;
    return listingCreatedByUser?.id;
  } catch (error) {
    throw new Error("Error getting listing by id");
  }
}
