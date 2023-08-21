import getCurrentUser from "@/actions/getCurrentUser";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listingId");
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  const listingCreatedByCurrentUser = await client.listing.findFirst({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });
  if (listingCreatedByCurrentUser)
    return NextResponse.json(
      {
        error: "You can't add your own listing to favorites",
      },
      { status: 400 }
    );

  const user = await client.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listingId");
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);
  const user = await client.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });
  return NextResponse.json(user);
}
