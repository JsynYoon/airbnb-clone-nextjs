import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUsers";
import prisma from "@/lib/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
    //? Ensures that only the user who made the reservation OR 
    //? ...the creator of the listing can delete the reservation.
      OR: [   
        { userId: currentUser.id }, 
        { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
