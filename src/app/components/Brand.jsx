import Link from "next/link";
import { LuLink2 } from "react-icons/lu";

export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="LnKut, inicio">
      <span className="brand-mark"><LuLink2 aria-hidden="true" /></span>
      LnKut<span className="brand-dot">.</span>
    </Link>
  );
}
