import { useState } from "react";
import Image from "next/image";

import download from "assets/icons/aml/download.svg";
import { DATA } from "datas/aml";
import Item from "components/templates/m/aml/Main/Item";
import Pagination from "components/organisms/Pagination";

const Main = ({ views }: { views: number }) => {
  const DATAS = new Array(127).fill(DATA);
  const [page, setPage] = useState(1);
  const array = DATAS.slice((page - 1) * views, page * views);
  const empty = false;

  return (
    <main className="pb-5">
      {empty ? (
        <div className="h-[200px]" />
      ) : (
        <>
          <section className="border-t border-gray-100 pt-5 px-5 mb-6 text-[#111111]">
            <h5 className="font-medium mb-4">
              <span className="text-[#0198FF] font-bold">26 matches for </span>
              Donald John Trump
            </h5>
            <button className="h-7 flex gap-1 px-2.5 py-1.5 border border-solid border-[#0198ff] rounded-20 bg-blue-rgba hover:bg-[#CCEAFF]">
              <p className="text-[#0198FF] text-xs h-3">Download Results</p>
              <Image src={download} alt="" />
            </button>
          </section>

          <div className="text-sm">
            <div className="px-5">
              {array.map((data, i) => (
                <Item data={data} key={i} />
              ))}
            </div>
            <Pagination
              total={DATAS.length}
              page={page}
              setPage={setPage}
              views={views}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Main;
