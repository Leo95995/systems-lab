import { Link } from "react-router-dom";
import type { IPageLayout } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";

const PageLayout: React.FC<IPageLayout> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>("");

  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    setCurrentPage(pathname);
  }, []);

  const isSelected = (target: string) => {
    if (target === currentPage) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="w-full min-h-screen p-4 md:p-10 bg-gray-100">
        <div className="flex gap-2 my-4">
          <Link
            onClick={() => setCurrentPage("")}
            className={`p-2 ${
              isSelected("")
                ? `bg-gray-500 text-white hover:bg-gray-400`
                : `bg-gray-300  hover:bg-gray-400`
            } rounded-md`}
            to={""}
          >
            Home
          </Link>
            <Link
            onClick={() => setCurrentPage("archive")}
            className={`p-2 ${
              isSelected("archive")
                ? `bg-gray-500 text-white hover:bg-gray-400`
                : `bg-gray-300  hover:bg-gray-400`
            } rounded-md`}
            to={"/archive"}
          >
            Archivio
          </Link>
          <Link
            onClick={() => setCurrentPage("docs")}
            className={`p-2 ${
              isSelected("docs")
                ? `bg-gray-500 text-white hover:bg-gray-400`
                : `bg-gray-300  hover:bg-gray-400`
            } rounded-md`}
            to={"/docs"}
          >
            Api Docs
          </Link>
        
        </div>
        {children}{" "}
      </div>
    </>
  );
};

export default PageLayout;
