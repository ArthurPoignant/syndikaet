import Link from "next/link";

function Navbar() {
  return (
    <div className="w-full flex justify-between items-center pt-4 pb-4 px-10 border-t-2 border-gray-50">
      <Link className="border-2 border-black w-14 h-7 text-center px-1 rounded-md" href="#news">News</Link>
      <Link className="border-2 border-black min-w-14 h-7 text-center px-1 rounded-md" href="#all-stars">Syndikaet All-stars</Link>
      <Link className="border-2 border-black w-14 h-7 text-center px-1 rounded-md" href="#shop">Shop</Link>
      <Link className="border-2 border-black min-w-14 h-7 text-center px-1 rounded-md" href="#newsletter">Newsletter</Link>
    </div>
  );
}

export default Navbar;
