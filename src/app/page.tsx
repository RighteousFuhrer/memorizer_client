import SideBar from "@/components/Sidebar";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen  justify-between p-24">
      <SideBar />
    </main>
  );
};

export default Home;
