"use client";
import { useThreads } from "@liveblocks/react";
import React from "react";
import { Composer, Thread } from "@liveblocks/react-ui";
import { cn } from "../../../../lib/utils";

function CommentBox() {
  const { threads } = useThreads();
  return (
    <div className="w-[300px] h-[350px] shadow-lg rounded-lg overflow-auto z-30">
      <div
        className={cn(
          `rounded-lg mb-2`,
          threads?.length > 0 ? "p-[0.2rem]" : ""
        )}
      >
        {threads?.map((thread) => (
          <Thread
            key={thread.id}
            thread={thread}
            className="rounded-lg transition lb.root"
          />
        ))}
      </div>
      {/* <Composer /> */}
      <Composer className="z-10 rounded-lg">
        <Composer.Submit className="">Reply</Composer.Submit>
      </Composer>
    </div>
  );
}

export default CommentBox;
