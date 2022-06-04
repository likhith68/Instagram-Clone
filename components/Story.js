import { useSession } from "next-auth/react";
import React from "react";
import Stories from "./Stories";

function Story() {
  const { data: session } = useSession();

  return (
    <div>
      {session && (
        <>
          <div className="flex p-4 border-gray-200 overflow-x-auto sm:scrollbar-thumb-transparent lg:scrollbar-thumb-black sm:space-x-2 scrollbar-thin  bg-white">
            <div className="pl-1 pr-1 hover:scale-110 transition transform duration-150 ease-out">
              <img
                className="rounded-full cursor-pointer object-contain w-12 border-red-500 border-2 p-0.5 h-12"
                src={session.user.image}
                alt=""
              />
              <p className="truncate text-sm italic w-12">
                {session.user.name}
              </p>
            </div>
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
            <Stories />
          </div>
        </>
      )}
    </div>
  );
}

export default Story;
