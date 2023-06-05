import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";

import { Field, Form, Formik } from "formik";
import { Subject } from "@/interfaces/Topic";

type props = {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  handleSubmit: (values: MyFormValues, actions: any) => void;
};

interface MyFormValues {
  title: string;
  subject: string;
  description: string;
}

function TopicForm({ isOpen, onClose, subjects, handleSubmit }: props) {
  const initialValues: MyFormValues = {
    title: "",
    subject: "Japanese",
    description: "",
  };

  const validate = (value: any) => {
    let errors;

    if (!value) {
      errors = "Value is required";
    }

    return errors;
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent className="p-10 rounded-xl">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(props) => (
              <Form>
                <Field name="subject">
                  {({ field, form }: any) => {
                    return (
                      <Flex height={"16"} width={"full"}>
                        <FormLabel py={2} width={28}>
                          Subject
                        </FormLabel>
                        <Select mx={4} {...field}>
                          {subjects.length > 0 &&
                            subjects.map((subject, index) => (
                              <option key={index}>{subject?.title}</option>
                            ))}
                        </Select>
                      </Flex>
                    );
                  }}
                </Field>
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
                            <FormErrorMessage>
                              {form.errors.title}
                            </FormErrorMessage>
                          </Flex>
                        </Flex>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="description">
                  {({ field, form }: any) => {
                    return (
                      <FormControl>
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
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TopicForm;
