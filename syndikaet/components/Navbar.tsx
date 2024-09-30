import Link from "next/link";

function Navbar() {
  return (
    <div className="w-full flex m-auto justify-between items-center sticky top-0 pt-4 pb-4 px-10 z-40 backdrop-blur-sm">
      <Link className="border-2 border-black bg-white w-40 h-7 text-center px-1 rounded-md hover:bg-black hover:text-white" href="#news">News</Link>
      <Link className="border-2 border-black bg-white w-40 h-7 text-center px-1 rounded-md hover:bg-black hover:text-white" href="#all-stars">Syndikaet All-stars</Link>
      <Link className="border-2 border-black bg-white w-40 h-7 text-center px-1 rounded-md hover:bg-black hover:text-white" href="#shop">Shop</Link>
      <Link className="border-2 border-black  bg-white w-40 h-7 text-center px-1 rounded-md hover:bg-black hover:text-white" href="#newsletter">Newsletter</Link>
    </div>
  );
}

export default Navbar;
