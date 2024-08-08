"use client";

import React, { useEffect } from "react";
import SideNav from "../../_components/SideNav";
import DocumentEditorSection from "../../_components/DocumentEditorSection";
import { Room } from "../../../../Room";

function WorkspaceDocument({ params }) {
  return (
    <div>
      <Room params={params}>
        {/* SideNav */}
        <div>
          <SideNav params={params} />
        </div>

        {/* Document */}
        <div className="md:ml-72">
          <DocumentEditorSection params={params} />
        </div>
      </Room>
    </div>
  );
}

export default WorkspaceDocument;
