import { Note } from "@/interfaces/Note";
import React from "react";
import NoteKanji from "./NoteKanji";
import NoteWord from "./NoteWord";
import NoteParagraph from "./NoteParagraph";
import { useRouter } from "next/navigation";

type props = {
  note: Note;
};

function NoteBlock({ note }: props) {

  const router = useRouter();
  const renderNoteContent = () => {
    if (note.type === "kanji") {
      return <NoteKanji note={note} />;
    } else if (note.type === "word") {
      return <NoteWord word={note} />;
    } else {
      return <NoteParagraph paragraph={note} />;
    }
  };

  const handleEdit = () => {
    router.refresh();
  };

  const handleDelete = () => {};

  return (
    <div className="p-4 w-full flex">
      {renderNoteContent()}

      <div className="flex flex-col ml-4">
        <button
          className="px-5 py-1.5 border border-blue-500 hover:bg-blue-100 font-medium text-blue-500 rounded-xl mb-2"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="px-4 py-1.5 border bg-red-500 hover:bg-red-600 font-medium text-white rounded-xl"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteBlock;
