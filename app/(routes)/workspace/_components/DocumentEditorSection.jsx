import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";

function DocumentEditorSection({ params }) {
  return (
    <div>
      {/* Header */}
      <DocumentHeader />

      {/* Document Info */}
      <DocumentInfo params={params} />

      {/* Text Editor */}
    </div>
  );
}

export default DocumentEditorSection;
