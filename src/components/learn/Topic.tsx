import React from "react";
import moment from "moment";
import Link from "next/link";
import { Topic } from "@/interfaces/Topic";

type props = {
  topic: Topic;
};

function TopicBlock({ topic }: props) {
  return (
    <Link
      href={`/learn/${encodeURIComponent(topic.id)}`}
      className="px-4 py-4 mb-3 flex justify-evenly border rounded-2xl hover:scale-125 hover:shadow-md"
    >
      <div className="w-16 text-center">{topic.id}</div>
      <div className="px-10 flex-1 text-center">{topic.title}</div>
      <div className="px-10 flex-1 text-center">{topic.subject.title}</div>
      <div className="w-16 text-center">{topic.notes.length}</div>
      <div className="w-16 text-center">{topic.questions.length}</div>
      <div className="w-28 mx-8 text-center">
        {moment(topic.createdAt).format("DD/MM/YYYY")}
      </div>
    </Link>
  );
}

export default TopicBlock;
