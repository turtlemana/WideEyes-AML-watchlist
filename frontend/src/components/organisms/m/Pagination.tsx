import { useEffect } from "react";
import Image from "next/image";

import arrow from "assets/icons/pagination/arrow.svg";

interface Props {
  total: number;
  page: number;
  setPage: (e: number) => void;
  views?: number;
}

const Pagination = ({ total, page, setPage, views }: Props) => {
  const listLimit = views || 5;
  const pageLimit = 4;
  const startPage =
    parseInt((page - 1) / (pageLimit + 1) + "") * (pageLimit + 1) + 1;
  const numPages = Math.ceil(total / listLimit);
  const endPage =
    startPage + pageLimit > numPages ? numPages : startPage + pageLimit;
  const pageArray = [];
  for (let i = startPage; i <= endPage; i++) {
    pageArray.push(i);
  }
  const handlePrev = () => page !== 1 && setPage(page - 1);
  const handleNext = () => page !== numPages && setPage(page + 1);

  useEffect(() => {
    setPage(1);
  }, [views]);

  return (
    <main className="w-full flex justify-center">
      <div className="flex items-center min-w-[264px] mt-5 mb-[52px]">
        <Image
          src={arrow}
          alt=""
          onClick={handlePrev}
          className={`cursor-pointer rotate-180 mr-5 w-4 ${
            page === 1 && "opacity-30 cursor-default"
          }`}
        />
        <div className="flex justify-around mx-auto gap-1">
          {pageArray.map((i) => (
            <div
              key={i}
              onClick={() => setPage(i)}
              className={`flex justify-center w-8 h-8 rounded-20 text-gray-600 text-xs py-[9px] border cursor-pointer ${
                page === i && "bg-[#E6F5FF] border-[#0198FF] text-[#0198FF]"
              }`}
            >
              <p className="h-4">{i}</p>
            </div>
          ))}
        </div>
        <Image
          src={arrow}
          alt=""
          onClick={handleNext}
          className={`cursor-pointer ml-5 w-4 ${
            page === numPages && "opacity-30 cursor-default"
          }`}
        />
      </div>
    </main>
  );
};

export default Pagination;
