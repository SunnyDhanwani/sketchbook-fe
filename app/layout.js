import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import DataProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sketchbook",
  description:
    "Sketchbook website made by Sunny using Next.js, Redux-toolkit, socket-io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
