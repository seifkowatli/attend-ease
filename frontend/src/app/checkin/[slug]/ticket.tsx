"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function snakeToReadable(snake: string): string {
  return snake
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export interface User {
  jwt: string;
  id: string;
  documentId: string;
  username: string;
}

const Ticket = ({ urlSlug, isCheckedIn, event, ticketData }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [canCheckIn, setCanCheckIn] = useState<boolean>(!isCheckedIn);

  const getZoneColor = (zone: string) => {
    if (zone.includes("H")) {
      return "bg-red-700";
    } else if (zone.includes("F")) {
      return "bg-green-700";
    } else if (zone.includes("S")) {
      return "bg-blue-700";
    } else {
      return "bg-gray-700";
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data)?.user);
      setToken(JSON.parse(data)?.jwt);
    }
  }, []);

  const {
    createdAt,
    name_ar,
    email,
    dinner,
    title,
    name_en,
    phone,
    category,
    seat,
    publishedAt,
    demo_day,
    VIP,
    documentId,
    id,
    slug,
    updatedAt,
    ...userData
  } = ticketData?.data[0];

  const registerAttendee = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event-attendances`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            attendee: documentId,
            event: event?.documentId,
            registered_by: user?.documentId,
          },
        }),
      }
    );

    if (res.ok) {
      alert("Attendee Checked-in Successfully");
      setCanCheckIn(false);
    } else {
      alert("Failed to Check-in Attendee");
    }
  };

  return (
    <section
      className="min-h-screen w-full flex-grow bg-[#015c5d] flex items-center justify-center p-4"
      style={{
        fontFamily: "IBM Plex Sans Arabic",
        boxShadow: VIP ? "0 0 15px gold" : "none"
      }}
    >
      <div style={{boxShadow : VIP ? '0px -1px 7px 3px #fdc700ab' : 'none'}} className="rounded-3xl relative flex flex-col w-full max-w-[320px] text-zinc-900">
        {/* Top Section */}
        <div className="w-full bg-[#b8f2fe] flex-col items-center justify-center py-8 px-8 rounded-t-3xl">
          {/* Logos side by side */}
          <div className="flex justify-between w-full mb-4">
            <div className="flex flex-col items-center">
              <Image src="/hack-syria.svg" alt="Logo 1" width={75} height={75} />
            </div>
            <div className="flex flex-col items-center">
              <Image src="/hack-syria-1.svg" alt="Logo 2" width={90} height={90} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl tracking-wider font-extrabold mt-3 text-center mb-6">
            DEMO DAY
          </h2>

          {/* Flight information */}
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
              <span className="text-zinc-600">السبت 8 آذار</span>
            </div>

            <div className="flex flex-col w-1/2 p-1 pt-2 pr-3">
              <span className="font-bold">الساعة</span>
              <span className="text-zinc-600">01:30 ظهراً</span>
            </div>
            <div className="flex flex-col w-1/2 p-1 pt-2">
              <span className="font-bold">المكان</span>
              <span className="text-zinc-600 text-sm">دار الأوبرا، دمشق</span>
            </div>

            <div className="flex flex-col w-1/2 p-1 pt-2 pr-3">
              <span className="font-bold">قسم الجلوس</span>
              <span className="text-zinc-600 flex items-center gap-1">
                {seat}
                <div className={`w-2 h-2 ${getZoneColor(seat)} rounded-full`}></div>
              </span>
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
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white bg-[#015c5d]">
                    {category}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex items-center border-dashed justify-between border-2 bg-white border-zinc-900">
          <div className="absolute rounded-full w-8 h-8 bg-[#015c5d] -left-5"></div>
          <div className="absolute rounded-full w-8 h-8 bg-[#015c5d] -right-5"></div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex-col items-center justify-center py-8 px-10 bg-[#b8f2fe] flex rounded-b-3xl">
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

          <QRCode value={window.location.href} bgColor="#b8f2fe" size={150} />
          <div className="w-full mt-2 text-center">
            <Link className="text-md" href="https://hack.startupsyria.org">
              hack.startupsyria.org
            </Link>
          </div>

          <div className="w-full mt-4 font-normal text-center flex justify-center items-center gap-1">
            <span className="text-sm">Powered By</span>
            <Link className="text-sm flex justify-center items-center gap-1" href="https://kraftsai.com">
              KraftsAI
              <Image src="/img/krafts-logo1.png" alt="Krafts Logo" width={25} height={25} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
