import { useState } from "react";
import { space } from "@/utils/fonts";
import { useRouter } from "next/router";

const Header = ({ url }: { url: string }) => {
  const _nav = [
    // {
    //   name: "Analytics",
    //   href: "/dashboard/[app]/analytics",
    // },
    {
      name: "Tiers",
      href: "/dashboard/[app]/tiers",
    },
    {
      name: "Feed",
      href: "/dashboard/[app]/feed",
    },
    // {
    //   name: "Settings",
    //   href: "/dashboard/[app]/settings",
    // },
  ];

  const router = useRouter();
  const app = router.query.app as string;

  const redirect = (href: string) => {
    router.push(href.replace("[app]", app));
  };

  return (
    <div
      className={`${space} flex h-14 w-full items-center border-b border-[#111] px-8`}
    >
      <div className="flex h-full items-center gap-x-5">
        {_nav.map((item, key) => (
          <button
            key={key}
            className={`group h-full ${
              item.href === url && "border-b-2 border-white"
            }`}
            onClick={() => redirect(item.href)}
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
