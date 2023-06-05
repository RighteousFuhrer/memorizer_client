import Link from "next/link";

function SideBar() {
  return (
    <div className="w-72 flex  flex-col sidebar px-6 py-24 border ">
      <Link
        href={"/"}
        className="font-bold text-3xl text-center mb-24 hover:underline"
      >
        Main
      </Link>
      <div className="flex flex-col">
        <Link
          href={"/learn"}
          className="font-semibold text-xl text-center mb-6 hover:underline"
        >
          Learn
        </Link>
        <Link
          href={"/exam"}
          className="font-semibold text-xl text-center  mb-6 hover:underline"
        >
          Exam
        </Link>
        <Link
          href={"/diary"}
          className="font-semibold text-xl text-center  mb-6 hover:underline"
        >
          Diary
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
