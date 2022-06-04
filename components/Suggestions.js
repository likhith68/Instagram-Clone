import { useSession } from "next-auth/react";
import React from "react";
import SuggestProfile from "./SuggestProfile";

function Suggestions() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="ml-10 mt-10 flex items-center justify-between">
        <h1>Suggestions for you</h1>
        <p>See All</p>
      </div>
      <div className="mt-30">
        <SuggestProfile />
        <SuggestProfile />
        <SuggestProfile />
        <SuggestProfile />
        <SuggestProfile />
      </div>
    </div>
  );
}

export default Suggestions;
