"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import QRCode from "react-qr-code";
import { registerAttendeeServerAction } from "./actions";

export interface User {
  jwt: string;
  id: string;
  documentId: string;
  username: string;
}

const Ticket = ({ urlSlug, isCheckedIn, user, event, ticketData }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [canCheckIn, setCanCheckIn] = useState<boolean>(!isCheckedIn);

  const {
    name_ar,
    email,
    dinner,
    title,
    name_en,
    phone,
    category,
    VIP,
    documentId,
  } = ticketData?.data[0];

  const registerAttendee = async () => {
    try {
      await registerAttendeeServerAction(documentId, event?.documentId, user?.documentId);
      alert("Attendee Checked-in Successfully");
      setCanCheckIn(false);
    } catch (e) {
      alert("Failed to Check-in Attendee");
    }
  };

  return (
    <section
      className="min-h-screen w-full flex-grow flex items-center justify-center p-4"
      style={{
        backgroundColor: event?.bg_color ?? "#015c5d",
        fontFamily: "IBM Plex Sans Arabic",
        boxShadow: VIP ? "0 0 15px gold" : "none",
      }}
    >
      <div
        style={{ boxShadow: VIP ? "0px -1px 7px 3px #fdc700ab" : "none" }}
        className="rounded-3xl relative flex flex-col w-full max-w-[320px] text-zinc-900"
      >
        <div
          className="w-full flex-col items-center justify-center py-8 px-8 rounded-t-3xl"
          style={{ backgroundColor: event?.ticket_color ?? "#b8f2fe" }}
        >
          <div className="flex justify-between w-full mb-4">
            <div className="flex flex-col items-center">
              { event?.logo_left?.formats?.thumbnail?.url && <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${event?.logo_left?.formats?.thumbnail?.url}`}
                alt="Logo 1"
                width={90}
                height={90}
              />}
            </div>
            <div className="flex flex-col items-center">
              { event?.logo_right?.formats?.thumbnail?.url&& <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${event?.logo_right?.formats?.thumbnail?.url}`}
                alt="Logo 2"
                width={90}
                height={90}
              />}
            </div>
          </div>

          <h2 className="text-4xl tracking-wider font-extrabold mt-3 text-center mb-6">
            {event?.name}
          </h2>

          <div dir="rtl" className="text-right w-full flex flex-wrap">
            {user?.username && (
              <div className="flex flex-col w-full">
                <span className="text-sm font-bold text-center text-zinc-600">
                  {phone}
                </span>
              </div>
            )}
            <div className="flex flex-col w-1/2 p-1 pt-2 w-full">
              <span className="font-bold font-ibm">الاسم</span>
              <span className="text-zinc-600">
                {title} {name_ar ?? name_en}
              </span>
            </div>

            <div className="flex flex-col w-1/2 p-1 pt-2">
              <span className="font-bold">التاريخ</span>
              <span className="text-zinc-600">{event?.date}</span>
            </div>

            <div className="flex flex-col w-1/2 p-1 pt-2">
              <span className="font-bold">المكان</span>
              <span className="text-zinc-600 text-sm">{event?.location}</span>
            </div>

            {user?.username && (
              <div className="flex w-full p-2 gap-1">
                <span className="text-sm font-bold text-zinc-600">
                  {dinner && (
                    <Image
                      src="/dinner-icon.svg"
                      alt="Dinner Icon"
                      width={20}
                      height={20}
                    />
                  )}
                </span>
                {category && (
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: event?.bg_color ?? "#015c5d" }}
                  >
                    {category}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full flex items-center border-dashed justify-between border-2 bg-white border-zinc-900">
          <div
            className="absolute rounded-full w-8 h-8 left-[-16px]"
            style={{ backgroundColor: event?.bg_color ?? "#015c5d" }}
          ></div>
          <div
            className="absolute rounded-full w-8 h-8 right-[-16px]"
            style={{ backgroundColor: event?.bg_color ?? "#015c5d" }}
          ></div>
        </div>

        <div
          className="w-full flex-col items-center justify-center py-8 px-10 flex rounded-b-3xl"
          style={{ backgroundColor: event?.ticket_color ?? "#b8f2fe" }}
        >
          {VIP && (
            <div className="w-full mb-4 text-center">
              <span className="inline-block bg-yellow-400 text-black font-bold px-3 py-1 rounded">
                VIP Ticket
              </span>
            </div>
          )}
          {!canCheckIn && user?.username && (
            <div className="w-full mb-6 text-center">
              <span className="text-sm font-bold text-zinc-600">
                Attendee is Checked-in
              </span>
            </div>
          )}
          {user?.username && canCheckIn && (
            <div className="w-full mb-6">
              <button
                onClick={registerAttendee}
                className="w-full cursor-pointer bg-[#096274] hover:bg-[#096274b3] text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Check-in Attendee
              </button>
            </div>
          )}

          <QRCode
            value={window.location.href}
            bgColor={event?.ticket_color ?? "#b8f2fe"}
            size={150}
          />

          <div className="w-full mt-4 font-normal text-center flex justify-center items-center gap-1">
            <span className="text-sm">Powered By</span>
            <Link
              className="text-sm flex justify-center items-center gap-1"
              href="https://kraftsai.com"
            >
              KraftsAI
              <Image
                src="/img/krafts-logo1.png"
                alt="Krafts Logo"
                width={25}
                height={25}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
