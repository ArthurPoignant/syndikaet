import "tailwindcss/tailwind.css";
import Header from "../../components/Header";
import Blog from "../../components/Blog";
import Artists from "../../components/Artists";

export default function Home() {
  return (
    <>
      <Header />
      <Blog />
      <Artists />
    </>
  );
}
