import { useState } from "react";
import { space } from "@/utils/fonts";

const Header = () => {
  const _nav = [
    {
      name: "Analytics",
      href: "/dashboard/1",
      current: true,
    },
    {
      name: "Tiers",
      href: "/dashboard/1",
      current: false,
    },
    {
      name: "Settings",
      href: "/dashboard/1",
      current: false,
    },
  ];

  const [nav, setNav] = useState(_nav);

  return (
    <div
      className={`${space} flex h-14 w-full items-center border-b border-[#111] px-8`}
    >
      <div className="flex h-full items-center gap-x-5">
        {nav.map((item, key) => (
          <button
            key={key}
            className={`group h-full ${
              item.current && "border-b-2 border-white"
            }`}
          >
            <div className="w-full rounded py-1 px-3 transition-all group-hover:bg-[rgba(25,25,25)]">
              {item.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
