import React from "react";
import SideNav from "../_components/SideNav";

function Workspace({ params }) {
  return (
    <div>
      <div>
        <SideNav params={params} />
      </div>
    </div>
  );
}

export default Workspace;
