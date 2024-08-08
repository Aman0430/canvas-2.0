"use client";
import {
  OrganizationSwitcher,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import Logo from "./Logo";
import React, { useEffect } from "react";
import { ThemeSwitcherBtn } from "../../components/ui/ThemeSwitcherBtn";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

function Header() {
  const { orgId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    user && saveUserData();
  }, [user]);

  const saveUserData = async () => {
    const docId = user?.primaryEmailAddress?.emailAddress;
    try {
      await setDoc(doc(db, "CanvasUsers", docId), {
        name: user?.fullName,
        avatar: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      });
    } catch (error) {
      toast.error("Error in saving user info");
    }
  };

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
