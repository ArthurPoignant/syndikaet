import "tailwindcss/tailwind.css";
import './globals.css';
import logoFull from "../../public/logoFull.jpeg";
import Header from "../../components/Header";
import Blog from "../../components/Blog";
import Artists from "../../components/Artists";
import Image from "next/image";
import Footer from "../../components/Footer";
import Newsletter from "../../components/Newsletter";
import Navbar from "../../components/Navbar";
import Shop from "../../components/Shop";

export default function Home() {
  return (
    <>
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <Navbar />
        <Blog />
        <Image
          src={logoFull}
          alt="logo"
          width={400}
          height={400}
          className="m-auto"
        />
        <Artists />
        <Shop />
      </div>
      <Newsletter />
      <Footer />
    </>
  );
}
