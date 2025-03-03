import { getEvent, getTicketData, isCheckedIn } from "./actions";
import Ticket from "./ticket";

export default async function Checkin({ params }: any) {
  const { slug } = params;
  const ticketData = await getTicketData(slug);
  const attendeeCheckedIn = await isCheckedIn(slug);
  const event = await getEvent();

  if(ticketData.data.length === 0) return <div>Invalid Ticket</div>;
  return (
    <Ticket
      urlSlug={slug}
      ticketData={ticketData}
      isCheckedIn={attendeeCheckedIn}
      event={event}
    />
  );
}
