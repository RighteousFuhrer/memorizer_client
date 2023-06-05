import { Note } from "@/interfaces/Note";
import Link from "next/link";
import React from "react";

type props = {
  note: Note;
};

function NoteKanji({ note }: props) {
  return (
    <div className="flex border py-6 px-8 rounded-xl items-center justify-center flex-1">
      <div className="flex items-center">
        <span className="text-lg font-medium">{note.id}</span>
      </div>
      <div className="border rounded-xl p-2 pb-3 flex justify-center items-start mx-6">
        <span className=" inline-block text-6xl">{note.kanji?.symbol}</span>
      </div>
      <section className="flex flex-1  ">
        <div className="flex flex-col mb-3 ml-4">
          <div className="flex flex-wrap">
            {note.kanji?.translations.map((translation, index) => {
              return (
                <span className="ml-2" key={index}>
                  {translation.translation};
                </span>
              );
            })}
          </div>
          <div className="flex flex-wrap mb-3">
            {note.kanji?.forms.map((form, index) => {
              return (
                <span className="ml-2" key={index}>
                  {form.form};
                </span>
              );
            })}
          </div>
          <Link
            href={note.kanji?.link || "/"}
            className="font-medium text-grey-600 hover:underline"
          >
            {note.kanji?.link}
          </Link>
        </div>
      </section>
      <div className="inline-block w-[1px] self-stretch bg-neutral-300 "></div>
      <section className="flex flex-1 items-start justify-start w-full h-full self-stretch">
        <div className="flex flex-wrap mb-3 ">
          {note.kanji?.forms.map((form, index) => {
            return (
              <span className="ml-2" key={index}>
                {form.form};
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default NoteKanji;
