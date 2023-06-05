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

function KanjiForm({ onClose, createNote }: props) {
  const initialValues = {
    examples: "",
    forms: "",
    translations: "",
    link: "",
    symbol: "",
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
      kanji: {
        examples: values.examples.split(";"),
        forms: values.forms.split(";"),
        translations: values.translations.split(";"),
        link: values.link,
        symbol: values.symbol,
      },
    });

    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form>
          <Field name="kanji" validate={validate}>
            {({ field, form }: any) => {
              return (
                <FormControl
                  isInvalid={form.errors.kanji && form.touched.kanji}
                >
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Kanji
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Kanji..." />
                      <FormErrorMessage>{form.errors.kanji}</FormErrorMessage>
                    </Flex>
                  </Flex>
                </FormControl>
              );
            }}
          </Field>
          <Field name="link">
            {({ field, form }: any) => {
              return (
                <FormControl>
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Link
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Link to jisho" />
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
                      Translation
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
          <Field name="forms" validate={validateMultiple}>
            {({ field, form }: any) => {
              return (
                <FormControl
                  isInvalid={form.errors.forms && form.touched.forms}
                >
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Forms
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Forms..." />
                      <FormErrorMessage>{form.errors.forms}</FormErrorMessage>
                    </Flex>
                  </Flex>
                </FormControl>
              );
            }}
          </Field>
          <Field name="examples" validate={validateMultiple}>
            {({ field, form }: any) => {
              return (
                <FormControl
                  isInvalid={form.errors.examples && form.touched.examples}
                >
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Examples
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Examples..." />
                      <FormErrorMessage>
                        {form.errors.examples}
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

export default KanjiForm;
