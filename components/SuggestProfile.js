import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar, Button } from "@mui/material";
import Chance from "chance"; //For Random Names Generator

function SuggestProfile() {
  const { data: session } = useSession();
  const [Seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [session]);

  return (
    <div className="flex items-center bg-white justify-between mt-5 ml-10">
      <div className="">
        <Avatar src={`https://picsum.photos/200?random=${Seed}`} />
      </div>
      <div className="flex-1 mx-5">
        <h1 className="font-bold">{chance.first()}</h1>
      </div>
      <div>
        <Button className="normal-case">Follow</Button>
      </div>
    </div>
  );
}

export default SuggestProfile;
