import Image from "next/image";
import { Avatar, Button } from "@mui/material";

import {
  SearchIcon,
  PlusCircleIcon,
  userGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import signin from "../pages/auth/signin";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Modalstate } from "../atoms/modalAtoms";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(Modalstate);

  return (
    <div className="shadow-sm border-b bg-white z-50 sticky top-0">
      {/* Main Header Container with Max Width */}
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="https://cdn.shopify.com/s/files/1/0249/5892/6941/products/stickerirononInstagram-Logo_3840x.png?v=1615134485"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden w-10 cursor-pointer"
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Middle */}
        <div className="max-w-xs">
          <div className="mt-1 relative p-3 rounded-md">
            <div className="absolute flex items-center pl-3 inset-y-0 pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:border-black focus:ring-black rounded-md"
              type="text"
              placeholder=" Search"
            />
          </div>
        </div>

        {/*Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navBtn " />
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="h-7 w-7 hover:scale-125 transition transform duration-150 ease-out cursor-pointer"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <Avatar
                onClick={signOut}
                className="h-10 w-10 hover:scale-125 transition transform duration-150 ease-out cursor-pointer"
                src={session?.user?.image}
              />
            </>
          ) : (
            <Button
              className="text-black border-black normal-case"
              onClick={signIn}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
