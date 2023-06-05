import { Note } from "@/interfaces/Note";
import React from "react";
import NoteBlock from "./NoteBlock";

type props = {
  notes: Note[];
};

function NoteFeed({ notes }: props) {
  return (
    <div className="flex flex-col w-full">
      {notes &&
        notes.length > 0 &&
        notes.map((note, index) => <NoteBlock note={note} key={index} />)}
    </div>
  );
}

export default NoteFeed;
