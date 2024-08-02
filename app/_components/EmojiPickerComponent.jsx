"use client";

import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { useTheme } from "next-themes";

function EmojiPickerComponent({ children, setEmojiIcon }) {
  const theme = useTheme();

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  return (
    <div>
      <div onClick={() => setOpenEmojiPicker(true)}>{children}</div>
      {openEmojiPicker && (
        <div className="z-10 absolute">
          <EmojiPicker
            emojiStyle="facebook"
            onEmojiClick={(e) => {
              setEmojiIcon(e.emoji);
              setOpenEmojiPicker(false);
            }}
            theme={theme.resolvedTheme}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPickerComponent;
