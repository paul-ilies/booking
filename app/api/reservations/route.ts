import getCurrentUser from "@/actions/getCurrentUser";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const body = await req.json();
  const { endDate, startDate, totalPrice, listingId } = body;
  if (!endDate || !startDate || !totalPrice || !listingId)
    return NextResponse.error();
  const reservation = await client.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate: startDate,
          endDate: endDate,
          totalPrice: totalPrice,
        },
      },
    },
  });
  return NextResponse.json(reservation);
}
