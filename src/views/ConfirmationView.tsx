import React from "react";
import { BookingResponse } from "../types/booking";
import logo from "../assets/logo.svg";

interface ConfirmationViewProps {
  booking: BookingResponse;
  onBackToBooking: () => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  booking,
  onBackToBooking,
}) => {
  const whenValue = booking.when ?? "";

  let datePart = "-";
  let timePart = "-";

  if (whenValue && whenValue.includes("T")) {
    const [date, time] = whenValue.split("T");
    datePart = date;
    timePart = time;
  }

  return (
    <main className="view confirmation-view">
      <img src={logo} alt="Strajk Bowling logo" className="page-logo" />
      <h2 className="view-title">SEE YOU SOON!</h2>

      <section className="section confirmation-section">
        <h3 className="section-title">BOOKING DETAILS</h3>

        <div className="confirmation-row">
          <span className="confirmation-label">DATE</span>
          <span className="confirmation-value">{datePart}</span>
        </div>

        <div className="confirmation-row">
          <span className="confirmation-label">TIME</span>
          <span className="confirmation-value">{timePart}</span>
        </div>

        <div className="confirmation-row">
          <span className="confirmation-label">PLAYERS</span>
          <span className="confirmation-value">{booking.people}</span>
        </div>

        <div className="confirmation-row">
          <span className="confirmation-label">LANES</span>
          <span className="confirmation-value">{booking.lanes}</span>
        </div>

        <div className="confirmation-row">
          <span className="confirmation-label">BOOKING NO</span>
          <span className="confirmation-value">{booking.id}</span>
        </div>

        <div className="confirmation-row total-row">
          <span className="confirmation-label total-row">TOTAL</span>
          <span className="confirmation-value total-row">
            {booking.price} kr
          </span>
        </div>
      </section>

      <button className="primary-button" onClick={onBackToBooking}>
        SWEET, LET&apos;S GO!
      </button>
    </main>
  );
};

export default ConfirmationView;
