export const dynamic = "force-dynamic";
import { Nunito } from "next/font/google";
import "./globals.css";
import ClientOnly from "@/components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";
import SearchModal from "@/components/modals/SearchModal";
import RentModal from "@/components/modals/RentModal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/actions/getCurrentUser";

export const metadata = {
  title: "Booking app ",
  description: "This is for test purpose only",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <head />
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
