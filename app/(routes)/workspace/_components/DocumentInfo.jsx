"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CoverPicker from "../../../_components/CoverPicker";
import EmojiPickerComponent from "../../../_components/EmojiPickerComponent";
import { SmilePlus } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebaseConfig";
import { toast } from "sonner";

function DocumentInfo({ params }) {
  const [coverImage, setCoverImage] = useState("/cover.png");
  const [emoji, setEmoji] = useState();
  const [documentInfo, setDocumentInfo] = useState();

  useEffect(() => {
    params && GetDocumentInfo();
  }, [params]);

  const GetDocumentInfo = async () => {
    const docRef = doc(db, "WorkspaceDocuments", params?.documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data());
      setDocumentInfo(docSnap.data());
      setEmoji(docSnap.data()?.emoji);
      docSnap.data()?.coverImage && setCoverImage(docSnap.data().coverImage);
    }
  };

  const updateDocumentInfo = async (key, value) => {
    const docRef = doc(db, "WorkspaceDocuments", params?.documentId);
    await updateDoc(docRef, {
      [key]: value,
    });
    toast.success("Document Updated", {
      description: `${key} updated successfully`,
    });
  };

  return (
    <div>
      {/* Cover */}
      <CoverPicker
        setNewCover={(cover) => {
          setCoverImage(cover);
          updateDocumentInfo("coverImage", cover);
        }}
      >
        <div className="relative group cursor-pointer">
          <h2
            className="hidden absolute p-4 w-full h-full
                    items-center group-hover:flex
                    justify-center  "
          >
            Change Cover
          </h2>
          <div className="group-hover:opacity-60 transition">
            <Image
              src={coverImage}
              width={800}
              height={800}
              className="w-full h-[200px] object-cover rounded-t-xl"
            />
          </div>
        </div>
      </CoverPicker>

      {/* Emoji Picker */}
      <div className="absolute ml-10 px-20 mt-[-40px] cursor-pointer">
        <EmojiPickerComponent
          setEmojiIcon={(emoji) => {
            setEmoji(emoji);
            updateDocumentInfo("emoji", emoji);
          }}
        >
          <div className="bg-[#ffffffb0] p-4 rounded-md">
            {emoji ? (
              <span className="text-5xl">{emoji}</span>
            ) : (
              <SmilePlus className="h-10 w-10 text-gray-500" />
            )}
          </div>
        </EmojiPickerComponent>
      </div>

      {/* File Name */}
      <div className="mt-10 px-20 ml-10 p-10">
        <input
          type="text"
          placeholder="Untitled Document"
          defaultValue={documentInfo?.documentName}
          className="text-4xl outline-none h-14 dark:bg-black font-semibold"
          onBlur={(e) => updateDocumentInfo("documentName", e.target.value)}
        />
      </div>
    </div>
  );
}

export default DocumentInfo;
