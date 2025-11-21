import { BookingRequest, BookingResponse } from "../types/booking";

export async function fetchApiKey(): Promise<string> {
  const res = await fetch(
    "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/key"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch API key");
  }

  const data = (await res.json()) as {
    key?: string;
    apiKey?: string;
    [k: string]: string | undefined;
  };

  const possibleKey = data.key;

  if (!possibleKey) {
    console.error("Unexpected API key response:", data);
    throw new Error("API key not found in response");
  }

  return possibleKey;
}

interface RawBookingDetails {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
  price: number;
  bookingId: string;
  active: boolean;
}

interface RawBookingResponse {
  success: boolean;
  bookingDetails: RawBookingDetails;
}

export async function createBooking(
  apiKey: string,
  booking: BookingRequest
): Promise<BookingResponse> {
  const res = await fetch(
    "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(booking),
    }
  );

  if (!res.ok) {
    throw new Error("Booking failed");
  }

  const raw = (await res.json()) as RawBookingResponse;

  console.log("Raw booking response from API:", raw);

  if (!raw.success || !raw.bookingDetails) {
    throw new Error("Unexpected booking response shape");
  }

  const details = raw.bookingDetails;

  const normalized: BookingResponse = {
    when: details.when,
    lanes: details.lanes,
    people: details.people,
    shoes: details.shoes,
    price: details.price,
    id: details.bookingId,
    active: details.active,
  };

  return normalized;
}
