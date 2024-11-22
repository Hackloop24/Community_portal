import { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";

const Main = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="bg-gray-900 text-gray-200 min-h-screen w-full flex flex-col">
        {/* Navigation Bar */}
        <Navbar setSearch={setSearch} />
        
        {/* Main Content */}
        <Home search={search} />
      </div>
    </>
  );
};

export default Main;
