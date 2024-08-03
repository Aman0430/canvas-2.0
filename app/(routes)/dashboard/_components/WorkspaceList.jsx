"use client";

import { Button } from "../../../../components/ui/button";
import { useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function WorkspaceList() {
  const { user } = useUser();
  const [workspaceList, setWorkspaceList] = useState([]);

  return (
    <div className="my-10 p-10 md:px-24 lg:px-36 xl:px-52">
      <div className="flex justify-between">
        <h2 className="text-semibold text-2xl">Hello, {user?.fullName}</h2>
        <Link href={"/createworkspace"}>
          <Button>
            <Plus />
          </Button>
        </Link>
      </div>
      <div className="mt-10 flex justify-between">
        <div>
          <h2 className="font-medium text-primary">Workspaces</h2>
        </div>
        <div className="flex gap-2">
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {workspaceList?.length == 0 ? (
        <div className="flex flex-col justify-center items-center my-10">
          <Image
            src={"/work-space.svg"}
            width={250}
            height={250}
            alt="workspace"
          />
          <h2>Create a new workspace</h2>
          <Link href={"/createworkspace"}>
            <Button variant="outline" className="my-3">
              <Plus />
              New Workspace
            </Button>
          </Link>
        </div>
      ) : (
        <div>Workspace List</div>
      )}
    </div>
  );
}

export default WorkspaceList;
