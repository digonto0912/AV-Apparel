import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-500 py-4 px-4 md:px-0">
      <Link href="/" className="hover:text-black">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <FiChevronRight size={12} />
          {item.href ? (
            <Link href={item.href} className="hover:text-black">{item.label}</Link>
          ) : (
            <span className="text-black">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
