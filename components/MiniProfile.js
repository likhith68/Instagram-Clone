import { Avatar, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import React from "react";

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-5 ml-10">
      <Avatar src={session?.user?.image} className="object-contain" />

      <div className="flex-1 mx-5">
        <h2 className="font-bold">{session?.user?.name}</h2>
        <h3 className="text-sm text-gray-500">Welcome to Instagram</h3>
      </div>

      <Button className="normal-case" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default MiniProfile;
