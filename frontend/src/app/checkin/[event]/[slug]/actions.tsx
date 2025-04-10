"use server"

import { cookies } from "next/headers";

const API_URL=process.env.API_URL


export const getTicketData = async (attendeeSlug: string, eventSlug: string) => {
  const response = await fetch(
    `${API_URL}/api/attendees?filters[slug][$eq]=${attendeeSlug}&filters[events][slug][$eq]=${eventSlug}`
  );
  return await response.json();
};


export const isCheckedIn = async (slug: string) => {
  const res = await fetch(`${API_URL}/api/event-attendances?filters[attendee][slug][$eq]=${slug}`);
  let data = await res.json();
  data = data?.data;
  return data?.length;
};

export const getEvent = async (slug: string) => {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=logo_right&populate=logo_left`
  );
  let data = await res.json();

  data = data?.data[0];
  return data;
};

export const registerAttendeeServerAction = async (attendeeId: string, eventId: string, registeredById: string) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/api/event-attendances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        attendee: attendeeId,
        event: eventId,
        registered_by: registeredById,
      },
    }),
  });

  if (!res.ok) throw new Error("Failed to check-in attendee");

  return await res.json();
};
