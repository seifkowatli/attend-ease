"use server";

export const getTicketData = async (slug: string) => {
  const response = await fetch(
    `http://localhost:4500/api/attendees?filters[slug][$eq]=${slug}`
  );
  return await response.json();
};

export const isCheckedIn = async (slug: string) => {
  const res = await fetch(`http://localhost:4500/api/event-attendances?filters[attendee][slug][$eq]=${slug}`);
  let data = await res.json();
  console.log('is checked server' , data)
  data = data?.data;
  return data.length;
};

export const getEvent = async () => {
  const res = await fetch(`http://localhost:4500/api/events`);
  let data = await res.json();
  data = data?.data[0];
  return data;
};

