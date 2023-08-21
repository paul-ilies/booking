"use client";

import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";
import { categories } from "@/components/navbar/Categories";
import useLoginModal from "@/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  currentUser?: any;
  listing: SafeListing & { user: SafeUser };
  listingCreatedByUser?: string | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  currentUser,
  listing,
  listingCreatedByUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((res) => {
      const range = eachDayOfInterval({
        start: new Date(res.startDate),
        end: new Date(res.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((cat) => cat.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(() => listing.price);
  const [dateRange, setDateRange] = React.useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Reservation created successfully");
        setDateRange(initialDateRange);
        router.refresh();
        router.push("/trips");
      })
      .catch((err) => {
        throw new Error("Error creating reservation");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing?.id,
    loginModal,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange?.endDate,
        dateRange?.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange?.endDate, dateRange?.startDate, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            listingCreatedByUser={listingCreatedByUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathRoomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              listingCreatedByUser={listingCreatedByUser}
              id={listing.id}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value: Range) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
                listingCreatedByUser={listingCreatedByUser}
                id={listing.id}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
