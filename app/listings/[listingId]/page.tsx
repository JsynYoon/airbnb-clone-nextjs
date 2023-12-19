import getCurrentUser from "@/actions/getCurrentUsers";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/actions/getReservations";

interface IParams {
    listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient 
  listing={listing} 
  reservations={reservations} 
  currentUser={currentUser}/>;
};

export default page;
