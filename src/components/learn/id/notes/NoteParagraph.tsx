import { Note } from "@/interfaces/Note";
import Link from "next/link";
import React from "react";
type props = {
  paragraph: Note;
};

function NoteParagraph({ paragraph }: props) {
  return (
    <div className="flex border py-6 px-8 rounded-xl items-center justify-center flex-1">
      <div className="text-lg font-medium">{paragraph.id}</div>
      <div className="flex-1 pl-8">
        <div className="grid grid-cols-2 w-full">
          <label className="font-medium ml-2">{paragraph.paragraph?.title}</label>
          <Link
            className="font-medium text-sm text-grey-600 hover:underline"
            href={paragraph.paragraph?.link || "/"}
          >
            {paragraph.paragraph?.link}
          </Link>
        </div>
        <p className="text-sm text-gray-500 break-words">{paragraph.paragraph?.text}</p>
      </div>
    </div>
  );
}

export default NoteParagraph;
