"use client";
import { Note } from "@/interfaces/Note";
import { Topic } from "@/interfaces/Topic";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { TopicContext } from "./TopicContext";
import NoteCreate from "./notes/NoteCreate";
import NoteFeed from "./notes/NoteFeed";
import QuestionFeed from "./questions/QuestionFeed";

type props = {
  notes: Note[];
  questions: any[];
  topic: Topic;
};

function Feed({ notes, questions, topic }: props) {
  const [mode, setMode] = useState("notes");
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  return (
    <div className="p-8 ">
      <div className="flex">
        <div className="w-full text-center flex items-center justify-center ">
          <span
            className={`text-lg h-full px-2 w-32 inline-block align-middle text-right ${
              mode === "notes" && "font-bold"
            } hover:cursor-pointer text-blue-500 hover:text-blue-700`}
            onClick={() => setMode("notes")}
          >
            Notes
          </span>
          <div className="inline-block h-8 w-[1px] self-stretch bg-neutral-200 "></div>
          <span
            className={`text-lg h-full px-2 w-28 inline-block text-left align-middle ${
              mode === "questions" && "font-bold"
            } hover:cursor-pointer text-blue-500 hover:text-blue-700`}
            onClick={() => setMode("questions")}
          >
            Questions
          </span>
        </div>
        <button
          className="px-4 py-1.5 bg-blue-500 font-medium text-white rounded-lg hover:bg-blue-600"
          onClick={onOpen}
        >
          Add
        </button>
        <TopicContext.Provider value={{ topic }}>
          <NoteCreate isOpen={isOpen} onClose={onClose} />
        </TopicContext.Provider>
      </div>
      <hr className="my-6 h-[1px] border-t-0 bg-neutral-200" />
      <div>
        {mode === "questions" ? (
          <QuestionFeed questions={questions} />
        ) : (
          <NoteFeed notes={notes} />
        )}
      </div>
    </div>
  );
}

export default Feed;
