import SideBar from "@/components/Sidebar";
import TopicHeader from "@/components/learn/id/TopicHeader";
import Feed from "@/components/learn/id/Feed";
import { Topic } from "@/interfaces/Topic";

export async function generateStaticParams() {
  const topics = await fetch("http://localhost:8080/topics").then((res) =>
    res.json()
  );

  return topics.map((topic: any) => ({
    id: String(topic.id),
  }));
}

async function getTopic(params: any) {
  const res = await fetch(`http://localhost:8080/topics/${params.id}`, {
    next : {revalidate: 1},
  });
  const topic = await res.json();

  return topic;
}

async function page({ params }: any) {
  const topic: Topic = await getTopic(params);

  return (
    <div className="flex w-full h-ful">
      <SideBar />
      <div className="w-full p-8">
        <TopicHeader topic={topic} />
        <Feed notes={topic.notes} questions={topic.questions} topic={topic}/>
      </div>
    </div>
  );
}

export default page;
