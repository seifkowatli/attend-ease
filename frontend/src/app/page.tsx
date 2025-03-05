import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full h-screen">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 h-full">
          <div className="bg-[#0C7B92]  p-8 md:p-12 lg:px-16 lg:py-24 flex items-center">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
              Simplifying Event Attendance with Attendease
              </h2>
              <p className="hidden text-white/90 sm:mt-4 sm:block">
              Attendease is a seamless event attendance tracking app designed to simplify registration and check-ins for conferences, workshops, and corporate events. It enables organizers to manage guest lists, track attendance in real time, and streamline event operations using QR code scanning and digital ticketing. Whether for small meetups or large-scale conferences, Attendease ensures a hassle-free experience for both attendees and hosts.
              </p>
              <div className="mt-4 md:mt-8">
                <Link
                  href="/login"
                  className="inline-block rounded-sm border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                >
                  Get Started Today
                </Link>
              </div>
              <div className="mt-4 md:mt-8">
                <Link
                  href="#"
                  className="inline-block mt-4 text-white/90 text-sm font-medium transition hover:text-white/100 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                >
                  Powered by KraftsAI
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <Image
              width={1000}
              height={1000}
              alt="Image 1"
              src="/img/bg-1.jpg"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
             <Image
              width={1000}
              height={1000}
              alt="Image 1"
              src="/img/bg-2.jpg"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
