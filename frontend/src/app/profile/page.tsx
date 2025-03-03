"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../checkin/[slug]/ticket";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (!data) {
      redirect("/login");
    } else {
      setUser((JSON.parse(data))?.user);
    }
  }, []);


  const logout = () => {
    localStorage.removeItem("user");
    redirect("/login");
  }


  return (
    <div className="overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 bg-[#000000]">
      <div className="flex-col justify-center items-end text-center min-h-screen sm:block">
        <div className="bg-[#096274] transition-opacity bg-opacity-75"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block text-left bg-[#0097b9] rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
            <div className="grid grid-cols-1">
              <div className="mt-4 mr-auto mb-4 ml-auto bg-[#0097b9] max-w-lg">
                <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                  <Image
                    alt="profile pic"
                    height={1000}
                    width={1000}
                    src={"/user-avatar.png"}
                    className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
                  />
                  <p className="mt-10 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                    {user?.username ?? 'user'}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-center text-white">
                    Welcome, You can now start scanning QR codes
                  </p>
                  <div className="w-full mt-6">
                    <button
                      onClick={logout}
                      className="w-full cursor-pointer bg-[#096274] hover:bg-[#096274b3] text-white font-medium py-2.5 rounded-lg transition-colors"
                    >
                      Logout 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
