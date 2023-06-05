import {
  Modal,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { Note } from "@/interfaces/Note";
import axios from "axios";
import { useState } from "react";
import KanjiForm from "../forms/KanjiForm";
import ParagraphForm from "../forms/ParagraphForm";
import WordForm from "../forms/WordForm";
import { useRouter } from "next/navigation";

type props = {
  isOpen: boolean;
  onClose: () => void;
};

function NoteCreate({ isOpen, onClose }: props) {
  const [mode, setMode] = useState("kanji");
  const router = useRouter();

  const createNote = async (note: Note) => {
    try {
      console.log(note)
      const res = await axios.post("http://localhost:8080/notes", note);
      onClose();

      router.replace(window.location.href);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = () => {
    if (mode === "kanji") {
      return <KanjiForm createNote={createNote} onClose={onClose} />;
    } else if (mode === "word") {
      return <WordForm createNote={createNote} onClose={onClose} />;
    } else if (mode === "paragraph") {
      return <ParagraphForm createNote={createNote} onClose={onClose} />;
    }

    return <div>Sorry, but there apears to be an error</div>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent className="p-10 rounded-xl">
        <RadioGroup onChange={setMode} value={mode} marginBottom={5}>
          <Stack direction="row" justifyContent={"center"}>
            <Radio value="kanji">Kanji</Radio>
            <Radio value="word">Word</Radio>
            <Radio value="paragraph">Paragraph</Radio>
          </Stack>
        </RadioGroup>
        {renderForm()}
      </ModalContent>
    </Modal>
  );
}

export default NoteCreate;
