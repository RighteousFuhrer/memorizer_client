"use client";
import SideBar from "@/components/Sidebar";
import FilterBlock from "../../components/learn/FilterBlock";
import { useState } from "react";
import TopicFeed from "@/components/learn/TopicFeed";
import { useDisclosure } from "@chakra-ui/react";
import TopicForm from "@/components/learn/TopicForm";
import axios from "axios";
import { useRouter } from "next/navigation";

type props = {
  subjects: {
    title: string;
    id: number;
  }[];
};

type Filter = {
  order: string;
  orderBy: string;
  subjects: number[];
};
interface TopicData {
  title: string;
  subject: string;
  description: string;
}

const urlfy = (obj: any) =>
  Object.keys(obj)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

function Content({ subjects }: props) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const fetchTopics = async (filter: Filter) => {
    const query = urlfy(filter).toString();
    setIsLoading(true);
    fetch(`http://localhost:8080/topics?${query}`, {
      next: {
        revalidate: 1,
        tags: ["topics"],
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
        sessionStorage.setItem("filters", JSON.stringify({ ...filter }));
      })
      .catch((err) => console.error(err));
  };

  const handleTopicSumbit = async (values: TopicData, actions: any) => {
    const filter = sessionStorage.getItem("filters");

    try {
      const res = (
        await axios.post("http://localhost:8080/topics", {
          title: values.title,
          subjectId: subjects.filter((s) => s.title === values.subject)[0].id,
          description: values.description,
        })
      ).data;

      actions.setSubmitting(false);
      onClose();
      if (filter) {
        fetchTopics(JSON.parse(filter));
      }

      router.refresh();
    } catch (error) {
      console.log(error);
    }

    // axios
    //   .post("http://localhost:8080/topics", {
    //     title: values.title,
    //     subjectId: subjects.filter((s) => s.title === values.subject)[0].id,
    //     description: values.description,
    //   })
    //   .then((res) => res.data)
    //   .then((data) => {
    //     actions.setSubmitting(false);
    //     onClose();
    //     if (filter) {
    //       fetchTopics(JSON.parse(filter));
    //     }

    //     router.refresh();
    //   })
    //   .catch(err => console.log(err));
  };

  return (
    <div className="flex w-full h-full">
      <SideBar />
      <div className="w-full p-8">
        <FilterBlock subjects={subjects} fetchTopics={fetchTopics} />
        <div className="flex w-full my-5 px-6 items-center">
          <h1 className="flex-1 text-center text-lg font-medium">Topics</h1>
          <button
            className="px-4 py-1.5 bg-blue-500 font-medium text-white rounded-lg hover:bg-blue-600"
            onClick={onOpen}
          >
            Add
          </button>

          <TopicForm
            isOpen={isOpen}
            onClose={onClose}
            subjects={subjects}
            handleSubmit={handleTopicSumbit}
          />
        </div>
        <TopicFeed topics={topics} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Content;
