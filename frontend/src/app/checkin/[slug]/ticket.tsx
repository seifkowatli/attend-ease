"use client";
import Image from "next/image";
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
  documentId : string;
  username: string;
}

const Ticket = ({ urlSlug, isCheckedIn, event , ticketData }: any) => {

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [canCheckIn, setCanCheckIn] = useState<boolean>(!isCheckedIn);
  console.log('isCheckedIn' , isCheckedIn)

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data){
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
    publishedAt,
    demo_day,
    documentId,
    id,
    slug,
    updatedAt,
    ...userData
  } = ticketData?.data[0];

  const registerAttendee = async () => {
    const res = await fetch(`https://attendease-cms.kraftsai.com/api/event-attendances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        data :  { 
          attendee: documentId,
          event: event?.documentId ,
          registered_by: user?.documentId,
        }
      }),
    });

    if (res.ok) {
      alert("Attendee Checked-in Successfully");
      setCanCheckIn(false);
    } else {
      alert("Failed to Check-in Attendee");
    }
  }

  return (
    <section className="min-h-screen w-full flex-grow bg-[#015c5d] flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-[300px] text-zinc-900">
        {/* Top Section */}
        <div className="w-full bg-[#b8f2fe] flex-col items-center justify-center py-8 px-8 rounded-t-3xl">
          {/* Logos side by side */}
          <div className="flex justify-between w-full mb-4">
            <div className="flex flex-col items-center">
              <Image
                src="/hack-syria.svg"
                alt="Logo 1"
                width={75}
                height={75}
              />
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/hack-syria-1.svg"
                alt="Logo 2"
                width={75}
                height={75}
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold mt-3 text-center mb-6">
            DEMO DAY
          </h2>
          <div className="w-full flex flex-wrap"></div>

          {/* Flight information */}
          <div className="w-full flex flex-wrap">
            <div className="flex flex-col w-full p-2">
              <span className="text-sm font-bold  text-zinc-600">{email}</span>
            </div>

            <div className="flex flex-col w-1/2 p-2">
              <span className="text-sm font-bold  text-zinc-600">Name</span>
              <span className="font-mono">
                {title} {name_en}
              </span>
            </div>

            {Object.keys(userData).map((key) => {
              return (
                userData[key] && (
                  <div key={key} className="flex flex-col w-1/2 p-2">
                    <span className="text-sm font-bold  text-zinc-600">
                      {snakeToReadable(key)}
                    </span>
                    <span className="font-mono">{userData[key]}</span>
                  </div>
                )
              );
            })}

            <div className="flex flex-col w-full p-2">
              <span className="text-sm font-bold  text-zinc-600">
                {dinner && (
                  <Image
                    src="/dinner-icon.svg"
                    alt="Logo 1"
                    width={20}
                    height={20}
                  />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex items-center border-dashed justify-between border-2 bg-white border-zinc-900">
          <div className="absolute rounded-full w-8 h-8 bg-[#015c5d] -left-5"></div>
          <div className="absolute rounded-full w-8 h-8 bg-[#015c5d] -right-5"></div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex-col items-center justify-center py-8 px-10 bg-[#b8f2fe] flex rounded-b-3xl">
          <QRCode value={"http://google.com"} bgColor="#b8f2fe" size={150} />
         

         {
          (!canCheckIn && user?.username) &&   <div className="w-full mt-6 text-center">
            <span className="text-sm font-bold  text-zinc-600">Attendee is Checked-in</span>
          </div>
         }
         {user?.username && canCheckIn && 
          <div className="w-full mt-6">
            <button
              onClick={registerAttendee}
              className="w-full cursor-pointer bg-[#096274] hover:bg-[#096274b3] text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Check-in Attendee
            </button>
          </div>}

        </div>
      </div>
    </section>
  );
};

export default Ticket;
