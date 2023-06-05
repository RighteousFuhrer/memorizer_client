import { Suspense,  } from "react";
import Content from "./Content";

async function getSubjects() {
  const res = await fetch("http://localhost:8080/subjects", {
    next: { revalidate: 1 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async () => {
  const subjects = await getSubjects();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content subjects={subjects} />
    </Suspense>
  );
};

export default page;
