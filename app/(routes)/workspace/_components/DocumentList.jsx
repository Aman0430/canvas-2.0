import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import DocumentOptions from "./DocumentOptions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { db } from "../../../../config/firebaseConfig";
import { toast } from "sonner";

function DocumentList({ documentList, params }) {
  const router = useRouter();

  const DeleteDocument = async (docId) => {
    await deleteDoc(doc(db, "WorkspaceDocuments", docId));
    toast.success("Document deleted successfully!");
  };

  const UpdateRename = async (docName) => {
    await updateDoc(doc(db, "WorkspaceDocuments", docName));
    toast.success("Document Renamed successfully!");
  };

  return (
    <div>
      {documentList.map((doc, index) => (
        <div
          key={index}
          onClick={() =>
            router.push("/workspace/" + params?.workspaceId + "/" + doc?.id)
          }
          className={`mt-3 p-2 px-3 hover:bg-primary/80 hover:text-white transition rounded-lg cursor-pointer flex justify-between items-center mx-2 ${
            doc?.id == params?.documentId && "bg-primary text-white"
          }`}
        >
          <div className="flex gap-2 items-center">
            {!doc.emoji && (
              <Image src={"/loopdocument.svg"} height={20} width={20} />
            )}
            <h2 className="flex gap-2">
              {doc?.emoji}
              {doc.documentName}
            </h2>
          </div>
          <DocumentOptions
            doc={doc}
            deleteDocument={(docId) => DeleteDocument(docId)}
            updateRename={(docName) => UpdateRename(docName)}
          />
        </div>
      ))}
    </div>
  );
}

export default DocumentList;
