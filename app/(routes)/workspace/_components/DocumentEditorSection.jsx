import React, { useState } from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import DocEditorJS from "./DocEditorJS";
import { Button } from "../../../../components/ui/button";
import { MessageSquareMore, X } from "lucide-react";
import CommentBox from "./CommentBox";

function DocumentEditorSection({ params }) {
  const [openCommentBox, setOpenCommentBox] = useState(true);
  return (
    <div>
      {/* Header */}
      <DocumentHeader />

      {/* Document Info */}
      <DocumentInfo params={params} />

      {/* Text Editor */}
      <DocEditorJS params={params} />

      <div className="fixed right-10 bottom-10 ">
        <Button
          className="p-0"
          variant="Ghost"
          onClick={() => setOpenCommentBox(!openCommentBox)}
        >
          {openCommentBox ? <X /> : <MessageSquareMore />}
        </Button>
        {openCommentBox && <CommentBox />}
      </div>
    </div>
  );
}

export default DocumentEditorSection;
