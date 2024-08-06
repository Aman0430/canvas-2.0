import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import DocEditorJS from "./DocEditorJS";

function DocumentEditorSection({ params }) {
  return (
    <div>
      {/* Header */}
      <DocumentHeader />

      {/* Document Info */}
      <DocumentInfo params={params} />

      {/* Text Editor */}
      <DocEditorJS params={params} />
    </div>
  );
}

export default DocumentEditorSection;
