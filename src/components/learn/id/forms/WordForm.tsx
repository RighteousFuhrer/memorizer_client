import { Note } from "@/interfaces/Note";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { TopicContext } from "../TopicContext";
import { TopicContextType } from "@/interfaces/Topic";

type props = {
  onClose: () => void;
  createNote: (note: Note) => void;
};

function WordForm({ onClose, createNote }: props) {
  const initialValues = {
    hirogana: "",
    katakana: "",
    romanji: "",
    kanji: "",
    translations: "",
  };
  const { topic } = useContext(TopicContext) as TopicContextType;

  const validate = (value: string) => {
    let error;

    if (!value) {
      error = "Value is required";
    }
    return error;
  };

  const validateMultiple = (value: string) => {
    let error;

    if (!value) {
      error = "Value is required";
    }
    return error;
  };

  const handleSubmit = (values: any, actions: any) => {
    createNote({
      topicId: topic.id,
      type: "kanji",
      word: {
        hirogana: values.hirogana,
        katakana: values.katakana,
        romanji: values.romanji,
        kanji: values.kanji,
        translation: values.translation.split(";"),
      },
    });

    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form>
          <Field name="hiragana" validate={validate}>
            {({ field, form }: any) => {
              return (
                <FormControl
                  isInvalid={form.errors.hiragana && form.touched.hiragana}
                >
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Hiragana
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Hira..." />
                      <FormErrorMessage>
                        {form.errors.hiragana}
                      </FormErrorMessage>
                    </Flex>
                  </Flex>
                </FormControl>
              );
            }}
          </Field>
          <Field name="katakana" validate={validate}>
            {({ field, form }: any) => {
              return (
                <FormControl
                  isInvalid={form.errors.katakana && form.touched.katakana}
                >
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Katakana
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Kata..." />
                      <FormErrorMessage>
                        {form.errors.katakana}
                      </FormErrorMessage>
                    </Flex>
                  </Flex>
                </FormControl>
              );
            }}
          </Field>

          <Field name="kanji">
            {({ field, form }: any) => {
              return (
                <FormControl>
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Kanji
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Kanji..." />
                    </Flex>
                  </Flex>
                </FormControl>
              );
            }}
          </Field>
          <Field name="romanji" validate={validate}>
            {({ field, form }: any) => {
              return (
                <FormControl
                  isInvalid={form.errors.romanji && form.touched.romanji}
                >
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Romanji
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Romaji..." />
                      <FormErrorMessage>{form.errors.romanji}</FormErrorMessage>
                    </Flex>
                  </Flex>
                </FormControl>
              );
            }}
          </Field>
          <Field name="translations" validate={validateMultiple}>
            {({ field, form }: any) => {
              return (
                <FormControl
                  isInvalid={
                    form.errors.translations && form.touched.translations
                  }
                >
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Translations
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Translations..." />
                      <FormErrorMessage>
                        {form.errors.translations}
                      </FormErrorMessage>
                    </Flex>
                  </Flex>
                </FormControl>
              );
            }}
          </Field>
          <div className="flex justify-end mt-4">
            <Button isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
            <Button onClick={onClose} className="ml-2">
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default WordForm;
