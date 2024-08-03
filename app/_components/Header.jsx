"use client";
import { OrganizationSwitcher, UserButton, useAuth } from "@clerk/nextjs";
import Logo from "./Logo";
import React from "react";
import { ThemeSwitcherBtn } from "../../components/ui/ThemeSwitcherBtn";

function Header() {
  const { orgId } = useAuth();
  // console.log(orgId);
  return (
    <div className="flex items-center justify-between p-3 shadow-sm">
      <Logo />
      <div className="flex items-center gap-2">
        <div className="dark:bg-secondary-foreground rounded-md p-[0.3rem]">
          <OrganizationSwitcher
            afterCreateOrganizationUrl={"/dashboard"}
            afterLeaveOrganizationUrl={"/dashboard"}
          />
        </div>
        <ThemeSwitcherBtn />
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
