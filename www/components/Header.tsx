import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <Link className="btn btn-ghost normal-case text-xl" href="/">
        Pizza
      </Link>
    </div>
  );
}
