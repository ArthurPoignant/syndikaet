import "tailwindcss/tailwind.css";
import logoFull from "../../public/logoFull.jpeg";
import Header from "../../components/Header";
import Blog from "../../components/Blog";
import Artists from "../../components/Artists";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <Blog />
      <Image src={logoFull} alt="logo" width={400} height={400} className="m-auto" />
      <Artists />
    </>
  );
}
