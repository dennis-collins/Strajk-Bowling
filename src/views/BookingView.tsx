import React, { useState } from "react";
import { BookingRequest } from "../types/booking";
import logo from "../assets/logo.svg";

interface BookingViewProps {
  onSubmit: (booking: BookingRequest) => void;
  isSubmitting: boolean;
  serverError: string | null;
}

const BookingView: React.FC<BookingViewProps> = ({
  onSubmit,
  isSubmitting,
  serverError,
}) => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [people, setPeople] = useState<number>(1);
  const [lanes, setLanes] = useState<number>(1);
  const [shoeSizes, setShoeSizes] = useState<string[]>([""]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const updateShoeInputsForPeople = (newPeople: number) => {
    if (newPeople < 1) newPeople = 1;

    setPeople(newPeople);

    setShoeSizes((prev) => {
      const copy = [...prev];
      if (newPeople > copy.length) {
        while (copy.length < newPeople) copy.push("");
      } else if (newPeople < copy.length) {
        copy.length = newPeople;
      }
      return copy;
    });
  };

  const handleShoeChange = (index: number, value: string) => {
    setShoeSizes((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!date || !time) {
      setErrorMessage("Please choose both date and time.");
      return;
    }
    // Shoes must = no. of playesr
    if (
      shoeSizes.length !== people ||
      shoeSizes.some((size) => size.trim() === "")
    ) {
      setErrorMessage("Each player must have a shoe size filled in.");
      return;
    }

    // Max 4 players/lane
    if (people > lanes * 4) {
      setErrorMessage(
        "Max 4 players per lane. Increase lanes or reduce players."
      );
      return;
    }

    const shoes = shoeSizes.map((size) => Number(size));

    const booking: BookingRequest = {
      when: `${date}T${time}`,
      lanes,
      people,
      shoes,
    };

    onSubmit(booking);
  };

  const combinedError = errorMessage || serverError || "";

  return (
    <main className="view booking-view">
      <img src={logo} alt="Strajk Bowling logo" className="page-logo" />
      <h2 className="view-title">BOOKING</h2>

      <form className="booking-form" onSubmit={handleSubmit}>
        <section className="section">
          <h3 className="section-title">WHEN, WHAT &amp; WHO</h3>

          <div className="field-row">
            <div className="field">
              <label className="field-label" htmlFor="date">
                DATE
              </label>
              <input
                id="date"
                type="date"
                className="field-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label" htmlFor="time">
                TIME
              </label>
              <input
                id="time"
                type="time"
                className="field-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="people">
              NUMBER OF AWESOME BOWLERS
            </label>
            <select
              id="people"
              className="field-input"
              value={people}
              onChange={(e) =>
                updateShoeInputsForPeople(Number(e.target.value))
              }
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "person" : "persons"}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="lanes">
              NUMBER OF LANES
            </label>
            <select
              id="lanes"
              className="field-input"
              value={lanes}
              onChange={(e) => setLanes(Number(e.target.value))}
            >
              {[1, 2].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "lane" : "lanes"}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="section">
          <h3 className="section-title">SHOES</h3>

          {shoeSizes.map((size, index) => (
            <div className="field" key={index}>
              <label className="field-label">
                SHOE SIZE / PERSON {index + 1}
              </label>
              <input
                type="number"
                className="field-input"
                placeholder="Euro size"
                value={size}
                onChange={(e) => handleShoeChange(index, e.target.value)}
              />
            </div>
          ))}
        </section>

        {combinedError && (
          <p className="form-error" role="alert">
            {combinedError}
          </p>
        )}

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "BOOKING…" : "STRIIIIKE!"}
        </button>
      </form>
    </main>
  );
};

export default BookingView;
