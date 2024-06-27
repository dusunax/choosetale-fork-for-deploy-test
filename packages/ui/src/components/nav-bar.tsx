"use client";
import { HomeIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { NavigationMenu, NavigationMenuItem } from "./ui/navigation-menu";
import { Link } from "@radix-ui/react-navigation-menu";

export default function NavBar() {
  return (
    <div className="w-full h-20 bg-black">
      <NavigationMenu className="w-full h-full max-w-none px-10">
        <ul className="w-full h-full flex justify-between items-center">
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
