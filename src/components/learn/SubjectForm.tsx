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
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

type props = {
  isOpen: boolean;
  onClose: () => void;
};

interface MyFormValues {
  subject: string;
}

function SubjectForm({ isOpen, onClose }: props) {
  const initialValues: MyFormValues = { subject: "" };
  const router = useRouter();

  const handleSumbit = async (values: MyFormValues, actions: any) => {
    axios
      .post("http://localhost:8080/subjects", {
        title: values.subject,
      })
      .then((res) => res.data)
      .then(() => {
        actions.setSubmitting(false);
        onClose();
        router.replace("/learn");
        router.refresh();
      })
      .catch((err) => console.error(err));
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
          <Formik initialValues={initialValues} onSubmit={handleSumbit}>
            {(props) => (
              <Form>
                <Field name="subject" validate={validate}>
                  {({ field, form }: any) => {
                    return (
                      <FormControl
                        isInvalid={form.errors.subject && form.touched.subject}
                      >
                        <Flex height={"16"}>
                          <FormLabel py={2} width={28}>
                            Title
                          </FormLabel>
                          <Flex direction={"column"} width={"full"}>
                            <Input {...field} placeholder="Title" />
                            <FormErrorMessage>
                              {form.errors.subject}
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
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SubjectForm;
