"use client";
import {
  Button,
  Tag,
  TagLabel,
  Flex,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";

import SortMenu from "./SortMenu";
import {  useEffect, useState } from "react";
import SubjectForm from "./SubjectForm";

type Filter = {
  order: string;
  orderBy: string;
  subjects: number[];
};

type props = {
  subjects: {
    id: number;
    title: string;
  }[];
  fetchTopics: (e: Filter) => void;
};

function FilterBlock({ subjects, fetchTopics }: props) {
  const [selectedSubjects, SetSelectedSubjects] = useState<number[]>([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hadleSelectSubject = (id: number) => {
    if (!selectedSubjects.includes(id)) {
      SetSelectedSubjects([...selectedSubjects, id]);
    } else {
      SetSelectedSubjects(selectedSubjects.filter((Subject) => Subject !== id));
    }
  };
  useEffect(() => {
    const filter = sessionStorage.getItem("filters");

    if (filter) {
      const obj = JSON.parse(filter);
      setOrder(obj.order);
      setOrderBy(obj.orderBy);
      SetSelectedSubjects([...obj.subjects]);

      fetchTopics({
        order: obj.order,
        orderBy: obj.orderBy,
        subjects:
          obj.subjects.length > 0
            ? obj.subjects
            : subjects.map((Subject) => Subject.id),
      });
    }
    return () => {};
  }, []);

  const handleClear = () => {
    SetSelectedSubjects([]);
    setOrder("asc");
    setOrderBy("id");
  };

  return (
    <div className="w-full flex border py-8 px-12 ">
      <div className="flex flex-col w-full">
        <div className="flex">
          <h1 className="font-medium mb-3 flex-1">Subjects</h1>
          <Button
            colorScheme="blue"
            rounded={"lg"}
            onClick={onOpen}
            size={"sm"}
            className="bg-blue-500"
          >
            New
          </Button>
          <SubjectForm isOpen={isOpen} onClose={onClose} />
        </div>
          <Flex wrap="wrap" className="mb-6">
            {subjects &&
              subjects.length > 0 &&
              subjects.map((subject, index) => {
                return (
                  <Tag
                    key={index}
                    size="md"
                    variant="solid"
                    className={`py-2 px-4 mb-2 cursor-pointer ml-2 rounded-lg ${
                      selectedSubjects.includes(subject.id)
                        ? "bg-blue-300"
                        : "bg-gray-300"
                    }`}
                    onClick={() => hadleSelectSubject(subject.id)}
                  >
                    <TagLabel>{subject.title}</TagLabel>
                  </Tag>
                );
              })}
          </Flex>
        <Divider className="mb-3" />
        <Flex justifyContent={"space-between"} width={"100"}>
          <Button
            colorScheme="blue"
            width={150}
            display={"block"}
            onClick={() =>
              fetchTopics({
                order,
                orderBy,
                subjects:
                  selectedSubjects.length > 0
                    ? selectedSubjects
                    : subjects.map((subject) => subject.id),
              })
            }
          >
            Filter
          </Button>
          <Flex>
            <Button variant={"outline"} colorScheme="red" onClick={handleClear}>
              Clear
            </Button>
            <div className="ml-4">
              <SortMenu
                order={order}
                property={orderBy}
                setOrder={setOrder}
                setProperty={setOrderBy}
              />
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}

export default FilterBlock;
