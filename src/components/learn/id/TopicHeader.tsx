"use client";
import { Topic } from "@/interfaces/Topic";
import React from "react";
import { useRouter } from "next/navigation";
import moment from "moment";

type props = {
  topic: Topic;
};

function TopicHeader({ topic }: props) {
  const router = useRouter();

  return (
    <div className="px-4 py-4 border flex">
      <div className="p-6 flex-col flex justify-center">
        <button
          className="px-4 py-2 border rounded-xl hover:text-white hover:bg-gray-500 border-gray-500 font-medium  text-gray-700"
          onClick={() => router.push("/learn")}
        >
          Back
        </button>
      </div>
      <section className="flex-1 flex flex-col ml-2">
        <h1 className="text-center font-semibold text-xl">{topic.title}</h1>
        <div className="flex-1">
          <label className="font-medium">Description</label>
          <p className="text-sm text-gray-500 break-words">
            {topic.description}
          </p>
        </div>
        <div className="ml-2 flex justify-between">
          <div className="font-medium">
            Created :{" "}
            <span className="font-normal">
              {moment(topic.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className="font-medium">
            Total
            <span className="ml-4 font-normal ">
              Notes: {topic.notes.length}
            </span>
            <span className="ml-4 font-normal  ">
              Questions: {topic.questions.length}
            </span>
          </div>
        </div>
      </section>

      <div className="flex flex-col p-6">
        <button
          className="px-4 py-1.5 mb-3 rounded-xl border bg-red-500  hover:bg-red-600 font-medium  text-white"
          onClick={() => {}}
        >
          Delete
        </button>
        <button
          className="px-4 py-1.5 border rounded-xl border-blue-500 font-medium hover:bg-blue-100  text-blue-700"
          onClick={() => {}}
        >
          Load
        </button>
      </div>
    </div>
  );
}

export default TopicHeader;
