// import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToasterContext from '../context/ToasterContext'
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`bg-main-background scroll-smooth`}
        style={{ fontFamily: "'Gelion', sans-serif" }}
      >
        <Navbar />
        <ToasterContext />
        
        {children}
        <Footer />
      </body>
    </html>
  );
}
