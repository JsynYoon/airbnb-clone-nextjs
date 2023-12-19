import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUsers";

import prisma from '@/lib/prismadb'

interface IParams {
    listingId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid ID");
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id  //? check if current user is also the owner of the listing
        }
    });

    return NextResponse.json(listing);
}