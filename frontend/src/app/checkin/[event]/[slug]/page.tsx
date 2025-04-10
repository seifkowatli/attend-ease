import { fetchCurrentUser } from "@/app/lib/session";
import { getEvent, getTicketData, isCheckedIn } from "./actions";
import Ticket from "./ticket";

export default async function Checkin({ params }: any) {
  const { slug , event : eventName } = params;
  const ticketData = await getTicketData(slug ,eventName);
  const attendeeCheckedIn = await isCheckedIn(slug);
  const event = await getEvent(eventName);
  const user = await fetchCurrentUser()

  console.log('ticketData' , ticketData)
  if (ticketData?.data?.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="p-6 bg-gray-800 shadow rounded">
          <p className="text-gray-100 text-xl">Invalid ticket</p>
        </div>
      </div>
    );
  return (
    <Ticket
      urlSlug={slug}
      ticketData={ticketData}
      isCheckedIn={attendeeCheckedIn}
      event={event}
      user={user}
    />
  );
}
