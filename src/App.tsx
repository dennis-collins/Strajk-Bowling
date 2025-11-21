import React, { useEffect, useState } from "react";
import "./App.css";
import BookingView from "./views/BookingView";
import ConfirmationView from "./views/ConfirmationView";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { BookingRequest, BookingResponse } from "./types/booking";
import { fetchApiKey, createBooking } from "./api/booking";
import LoadingScreen from "./components/LoadingScreen";

type ViewName = "booking" | "confirmation";

function App() {
  const [currentView, setCurrentView] = useState<ViewName>("booking");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  const [bookingResponse, setBookingResponse] =
    useState<BookingResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    const loadKey = async () => {
      try {
        const key = await fetchApiKey();
        setApiKey(key);
        setApiKeyError(null);
      } catch (error) {
        console.error(error);
        setApiKeyError("Could not load API key. Please try again later.");
      }
    };

    loadKey();
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => setIsMenuOpen(false);

  const goToBooking = () => {
    setCurrentView("booking");
    setIsMenuOpen(false);
  };

  const goToConfirmation = () => {
    setCurrentView("confirmation");
    setIsMenuOpen(false);
  };

  const handleBookingSubmit = async (booking: BookingRequest) => {
    setBookingError(null);

    if (!apiKey) {
      setBookingError("Cannot send booking right now (no API key).");
      return;
    }

    try {
      setIsSubmitting(true);

      const apiCall = createBooking(apiKey, booking);
      const minimumDelay = new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await Promise.all([apiCall, minimumDelay]).then(
        ([result]) => result
      );

      console.log("Booking response from API:", response);

      setBookingResponse(response);
      setCurrentView("confirmation");
    } catch (error) {
      console.error(error);
      setBookingError(
        "Oops! The booking could not be completed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToBooking = () => {
    setCurrentView("booking");
  };

  return (
    <div className="app">
      <Header onMenuClick={handleToggleMenu} />

      {apiKeyError && (
        <p className="form-error api-error" role="alert">
          {apiKeyError}
        </p>
      )}

      {currentView === "booking" && (
        <BookingView
          onSubmit={handleBookingSubmit}
          isSubmitting={isSubmitting}
          serverError={bookingError}
        />
      )}

      {currentView === "confirmation" && bookingResponse && (
        <ConfirmationView
          booking={bookingResponse}
          onBackToBooking={handleBackToBooking}
        />
      )}

      <Menu
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onGoToBooking={goToBooking}
        onGoToConfirmation={goToConfirmation}
      />

      {isSubmitting && <LoadingScreen />}
    </div>
  );
}

export default App;
