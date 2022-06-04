import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Chance from "chance"; //For Random Names Generator

function Stories({ img, name }) {
  const [Seed, setSeed] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [session]);

  return (
    <div className="pl-1 pr-1 hover:scale-110 transition transform duration-150 ease-out">
      <img
        className="rounded-full cursor-pointer object-contain w-12 border-red-500 border-2 p-0.5 h-12"
        src={`https://picsum.photos/200?random=${Seed}`}
        alt=""
      />
      <p className="truncate text-sm italic w-12">{chance.first()}</p>
    </div>
  );
}
export default Stories;
