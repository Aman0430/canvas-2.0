"use client";

import React, { useEffect, useState } from "react";
import { ThemeSwitcherBtn } from "../../../../components/ui/ThemeSwitcherBtn";
import { Button } from "../../../../components/ui/button";
import { Progress } from "../../../../components/ui/progress";
import Logo from "../../../_components/Logo";
import { Bell, Loader2, Plus } from "lucide-react";
import { db } from "../../../../config/firebaseConfig";
import DocumentList from "./DocumentList";
import {
  collection,
  onSnapshot,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import uuid4 from "uuid4";
import { toast } from "sonner";

const MAX_FILE = process.env.NEXT_PUBLIC_MAX_FILE_COUNT;

function SideNav({ params }) {
  const [documentList, setDocumentList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    params && GetDocumentList();
  }, [params]);

  const GetDocumentList = () => {
    const q = query(
      collection(db, "WorkspaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceId))
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setDocumentList([]);

      querySnapshot.forEach((doc) => {
        setDocumentList((documentList) => [...documentList, doc.data()]);
        // console.log(doc.data());
      });
    });
  };

  const CreateNewDocument = async () => {
    if (documentList?.length >= MAX_FILE) {
      toast("Upgrade to add new file", {
        description:
          "You reach Plan, Please upgrade for unlimited file creation",
        action: {
          label: "Upgrade",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }

    setLoading(true);
    const docId = uuid4();
    await setDoc(doc(db, "WorkspaceDocuments", docId.toString()), {
      workspaceId: Number(params?.workspaceId),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      emoji: null,
      id: docId,
      documentName: "Untitled Document",
      documentOutput: [],
    });

    await setDoc(doc(db, "documentOutput", docId.toString()), {
      docId: docId,
      output: [],
    });

    setLoading(false);
    router.replace("/workspace/" + params?.workspaceId + "/" + docId);
  };

  return (
    <div className="h-screen fixed md:w-72 hidden md:block bg-secondary">
      <div className="flex justify-between items-center p-5">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <Bell className="h-5 w-5" />
        </div>
      </div>
      <hr className="my-3 mx-3 dark:border-white/30"></hr>

      <div>
        <div className="flex justify-between px-3">
          <h2>Workspace Name</h2>
          <Button size="sm" onClick={CreateNewDocument}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus />}
          </Button>
        </div>
      </div>

      <DocumentList documentList={documentList} params={params} />

      <div className="absolute bottom-10 w-[90%] mx-3">
        <Progress value={(documentList?.length / MAX_FILE) * 100} />
        <h2 className="text-sm font-light my-2">
          <strong>{documentList?.length}</strong> Out of {MAX_FILE} files used
        </h2>
        <Button variant={"link"} className="p-0">
          Upgrade your plan
        </Button>
      </div>
    </div>
  );
}

export default SideNav;
