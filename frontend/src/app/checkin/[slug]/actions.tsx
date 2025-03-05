"use server";

export const getTicketData = async (slug: string) => {
  const response = await fetch(
    `https://attendease-cms.kraftsai.com/api/attendees?filters[slug][$eq]=${slug}`
  );

  console.log('dat1 ' , response)
  return await response.json();
};

export const isCheckedIn = async (slug: string) => {
  const res = await fetch(`https://attendease-cms.kraftsai.com/api/event-attendances?filters[attendee][slug][$eq]=${slug}`);
  let data = await res.json();
  console.log('dat2 ' , data)
  data = data?.data;
  return data?.length;
};

export const getEvent = async () => {
  const res = await fetch(`https://attendease-cms.kraftsai.com/api/events`);
  let data = await res.json();
  console.log(data)
  data = data?.data[0] ;
  return data;
};
