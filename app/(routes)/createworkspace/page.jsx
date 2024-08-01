"use client";

import CoverPicker from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SmilePlus, SquarePen } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState("/cover.png");
  const [emoji, setEmoji] = useState();
  const [workspaceName, setWorkspaceName] = useState("");

  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-[26rem] py-28 min-h-screen">
      <div className="shadow-2xl rounded-xl">
        {/* Cover Image */}
        <CoverPicker setNewCover={(value) => setCoverImage(value)}>
          <div className="relative group cursor-pointer">
            <h2 className="hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center gap-2 text-black">
              Change Cover
              <SquarePen />
            </h2>
            <div className="group-hover:opacity-40 transition">
              <Image
                src={coverImage}
                width={400}
                height={400}
                className="w-full h-[180px] object-cover rounded-t-xl"
              />
            </div>
          </div>
        </CoverPicker>

        {/* Input Section */}
        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new work</h2>
          <h2 className="text-sm mt-2">
            This is a shared space where you can collaborate with your team.
          </h2>
          <div className="flex gap-2 items-center mt-8">
            <EmojiPickerComponent setEmojiIcon={(value) => setEmoji(value)}>
              <Button type="icon" variant="outline">
                {emoji ? emoji : <SmilePlus />}
              </Button>
            </EmojiPickerComponent>
            <Input
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>
          <div className="mt-7 flex justify-end gap-6">
            <Button disabled={!workspaceName?.length}>Create</Button>
            <Button variant="destructive">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;
