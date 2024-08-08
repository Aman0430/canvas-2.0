"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardFooter } from "../../../../components/ui/card";

function WorkspaceItemList({ workspaceList }) {
  const router = useRouter();
  const OnClickWorkspaceItem = (workspaceId) => {
    router.push("/workspace/" + workspaceId);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {workspaceList &&
        workspaceList.map((workspace, index) => (
          <Card
            className="hover:scale-105 transition"
            onClick={() => OnClickWorkspaceItem(workspace.id)}
            key={index}
          >
            <Image
              src={workspace?.coverImage}
              width={400}
              height={200}
              alt="cover"
              className="cursor-pointer rounded-t-lg"
            />
            <CardFooter className="mt-2">
              <h2 className="flex gap-2">
                {workspace?.emoji} {workspace.workspaceName}
              </h2>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

export default WorkspaceItemList;
