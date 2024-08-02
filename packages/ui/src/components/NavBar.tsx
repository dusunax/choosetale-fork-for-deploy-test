"use client";
import { HomeIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Link } from "@radix-ui/react-navigation-menu";
import { NavigationMenu, NavigationMenuItem } from "./ui/NavigationMenu";

export default function NavBar() {
  return (
    <div className="w-full h-20 shrink-0 bg-black">
      <NavigationMenu className="w-full h-full max-w-none px-10">
        <ul className="w-full h-full flex justify-between items-center !mb-0">
          <NavigationMenuItem className="">
            <Link href="/">
              <HomeIcon height={24} width={24} color="white" className="m-2" />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/game/create">
              <Pencil2Icon
                height={24}
                width={24}
                color="white"
                className="m-2"
              />
            </Link>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
          <Link href="/user">
            <PersonIcon height={24} width={24} color="white" className="m-2" />
          </Link>
        </NavigationMenuItem> */}
        </ul>
      </NavigationMenu>
    </div>
  );
}
