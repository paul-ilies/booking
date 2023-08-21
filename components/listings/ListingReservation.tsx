"use client";
import React from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
  listingCreatedByUser?: string | null;
  id: string;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  listingCreatedByUser,
  id,
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {listingCreatedByUser !== id && (
        <div className="flex items-center gap-1 p-4 ">
          <div className="text-2xl font-semibold">$ {price}</div>
          <div className="font-light text-neutral-600">night</div>
        </div>
      )}

      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => (
          console.log(value), onChangeDate(value.selection)
        )}
      />
      <hr />
      <div className="p-4">
        <Button
          onClick={onSubmit}
          disabled={listingCreatedByUser === id || disabled}
          label="Reserve"
        />
      </div>
      {listingCreatedByUser !== id && (
        <div className="p-4 flex items-center justify-between font-semibold text-lg">
          <div>Total</div>
          <div>$ {totalPrice}</div>
        </div>
      )}
    </div>
  );
};

export default ListingReservation;
