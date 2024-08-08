"use client";

import { collection, getDocs, query, where } from "firebase/firestore";
import { Button } from "../../../../components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../components/ui/hover-card";
import WorkspaceItemList from "./WorkspaceItemList";
import { useAuth, useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { db } from "../../../../config/firebaseConfig";

function WorkspaceList() {
  const { user } = useUser();
  const { orgId } = useAuth();
  const [workspaceList, setWorkspaceList] = useState([]);

  useEffect(() => {
    user && getWorkspaceList();
  }, [orgId, user]);

  const getWorkspaceList = async () => {
    const q = query(
      collection(db, "Workspace"),
      where(
        "orgId",
        "==",
        orgId ? orgId : user?.primaryEmailAddress?.emailAddress
      )
    );
    const querySnapshot = await getDocs(q);
    setWorkspaceList([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setWorkspaceList((prev) => [...prev, doc.data()]);
    });
  };

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
          <HoverCard>
            <HoverCardTrigger>
              <LayoutGrid className="cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent>Grid View</HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger>
              <AlignLeft className="cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent>List View</HoverCardContent>
          </HoverCard>
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
        <div>
          <WorkspaceItemList workspaceList={workspaceList} />
        </div>
      )}
    </div>
  );
}

export default WorkspaceList;
