import Image from "next/image";
import logo from "../public/logo.png";

function Header() {
  return (
    <div className="bg-white w-full flex justify-center items-center">
      <Image src={logo} alt="logo" width={100} height={100} />
    </div>
  );
}

export default Header;
