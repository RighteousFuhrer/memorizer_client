import { Note } from "@/interfaces/Note";
import { TopicContextType } from "@/interfaces/Topic";
import { TopicContext } from "../TopicContext";
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

type props = {
  onClose: () => void;
  createNote: (note: Note) => void;
};

function ParagraphForm({ onClose, createNote }: props) {
  const initialValues = { link: "", title: "", text: "" };
  const { topic } = useContext(TopicContext) as TopicContextType;

  const validate = (value: string) => {
    let error;

    if (!value) {
      error = "Value is required";
    }
    return error;
  };

  const handleSubmit = (values: any, actions: any) => {
    //console.error(values);

    createNote({
      topicId: topic.id,
      type: "paragraph",
      paragraph: {
        link: values.link,
        title: values.title,
        text: values.description,
      },
    });

    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form>
          <Field name="title" validate={validate}>
            {({ field, form }: any) => {
              return (
                <FormControl
                  isInvalid={form.errors.title && form.touched.title}
                >
                  <Flex height={"16"}>
                    <FormLabel py={2} width={28}>
                      Title
                    </FormLabel>
                    <Flex direction={"column"} width={"full"}>
                      <Input {...field} placeholder="Title" />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </Flex>
                  </Flex>
                </FormControl>
              );
            }}
          </Field>
          <Field name="description">
            {({ field, form }: any) => {
              return (
                <FormControl mb={6}>
                  <Flex>
                    <FormLabel py={2} width={28}>
                      Description
                    </FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Description"
                      resize={"none"}
                    />
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
                      <Input {...field} placeholder="Link" />
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

export default ParagraphForm;
