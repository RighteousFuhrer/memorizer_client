import { Spinner } from "@chakra-ui/react";
import TopicBlock from "./Topic";
import { Topic } from "@/interfaces/Topic";

type props = {
  topics: Topic[];
  isLoading: boolean;
};

function TopicFeed({ topics, isLoading }: props) {
  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  return (
    <div>
      {topics &&
        topics.length > 0 &&
        topics.map((topic, index) => {
          return <TopicBlock key={index} topic={topic} />;
        })}
    </div>
  );
}

export default TopicFeed;
