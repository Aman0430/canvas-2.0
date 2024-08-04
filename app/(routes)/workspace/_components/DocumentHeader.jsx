import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Share } from "lucide-react";

function DocumentHeader() {
  return (
    <div className="flex justify-between items-center p-3 px-7 shadow-md">
      <div></div>
      <div className="bg-secondary dark:bg-primary-foreground rounded-md flex p-2 items-center">
        <OrganizationSwitcher />
      </div>
      <div className="flex gap-2">
        <Button>
          Share <Share />
        </Button>
        <UserButton />
      </div>
    </div>
  );
}

export default DocumentHeader;
