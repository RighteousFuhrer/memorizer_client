import { Note } from "@/interfaces/Note";
import { useEffect, useState } from "react";
import { Switch } from "@chakra-ui/react";

type props = {
  word: Note;
};

function NoteWord({ word }: props) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex border py-6 px-8 w-full rounded-xl items-center flex-1">
      <div className="text-lg font-medium">{word.id}</div>
      <div className="flex flex-1 flex-col pl-8 items-center">
        <span>{checked ? word.word?.katakana : word.word?.hirogana}</span>
        <span className="text-sm text-gray-500">{word.word?.romanji}</span>
      </div>
      <span className="text-sm font-medium flex flex-1 justify-center">
        H
        <Switch
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
          className="mx-2"
        />
        K
      </span>
      <div className="flex flex-1 justify-center">
        <span>{word.word?.kanji}</span>
      </div>
      <div className="flex flex-1 flex-wrap">
        {word.word?.translation &&
          word.word?.translation.map((translation, index) => (
            <span key={index}>{translation.translation}</span>
          ))}
      </div>
    </div>
  );
}

export default NoteWord;
