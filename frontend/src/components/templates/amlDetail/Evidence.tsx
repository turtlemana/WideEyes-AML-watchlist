import { useState,useMemo } from "react";
import Image from "next/image";

import arrow from "assets/icons/aml/arrow.png";
import { Evidence } from "interfaces/detail";
import Link from "next/link";
import { useToggle } from "contexts/toggleContext";
import useTitleFromDataset from "utils/useTitleFromDataSet";

interface Props {
  data :Evidence[];
  dataset:string[];
}



const Evidence = ({data,dataset}:Props) => {
  const [menu, setMenu] = useState("All");

  const { state, dispatch } = useToggle();
  const toggle = (id: string) => {
    dispatch({ type: 'TOGGLE', id });
  }

  const filteredData = useMemo(() => {
    let filtered = data.filter((item: Evidence) => menu === "All" || (item.DATASET ? item.DATASET.includes(menu) : false));
    filtered = filtered.sort((a, b) => {
        if(a.CAP_DATE === null || a.CAP_DATE === "Unknown") return 1;
        if(b.CAP_DATE === null || b.CAP_DATE === "Unknown") return -1;

        return new Date(b.CAP_DATE).getTime() - new Date(a.CAP_DATE).getTime();
    });
    return filtered;
}, [data, menu]);


const getTitleFromDataset = useTitleFromDataset();

  return (
    <main className="max-w-1320 mx-auto py-8 rounded-20 bg-white my-5 text-[#111111]">
      <section className="flex gap-2.5 mb-10 px-8 overflow-scroll scrollbar-hide">
        {dataset.map((data:string, i:number) => (
          <article
            key={i}
            onClick={() => setMenu(data)}
            className={`h-10 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer min-w-fit
            ${
              data === menu
                ? "border-gray-900 text-white bg-gray-900"
                : "border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            }`}
          >
            {data}
          </article>
        ))}
      </section>

      {filteredData.map(({ EVIDENCEID, TITLE,DATASET,KEYWORD,ORI_URL,PUB_DATE,SUMMARY,CAP_DATE }:Evidence, i:number) => (
        <div key={i} className={`${i !== filteredData.length - 1 && "mb-3"} px-8`}>
          <article
            className={`py-6 px-8 bg-gray-50 border-y border-gray-200 
                        ${i !== filteredData.length - 1 && "mb-4"}`}
          >
            <article
              className="flex items-center justify-between gap-2 mb-2 cursor-pointer"
              onClick={() => toggle(`evidenceOpen${EVIDENCEID}+${i}`)
              }
            >
              <h1 className="text-xl">{TITLE ? EVIDENCEID + " : " + TITLE : EVIDENCEID}</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!state[`evidenceOpen${EVIDENCEID}+${i}`] && "rotate-180"} mb-1`}
              />
            </article>
            {state[`evidenceOpen${EVIDENCEID}+${i}`] && (
              <ul>
              {CAP_DATE &&  <li className="grid grid-cols-2 gap-5 py-[14px] border-b border-gray-100" style={{gridTemplateColumns: '200px 1fr'}}>
                  <p className="text-gray-400">Captured</p>
                  <p>{CAP_DATE}</p>
                </li>}
             {PUB_DATE &&   <li className="grid grid-cols-2 gap-5 py-[14px] border-b border-gray-100" style={{gridTemplateColumns: '200px 1fr'}}>
                  <p className="text-gray-400">Published</p>
                  <p>{PUB_DATE}</p>
                </li>}
             {TITLE &&   <li className="grid grid-cols-2 gap-5 py-[14px] border-b border-gray-100" style={{gridTemplateColumns: '200px 1fr'}}>
                  <p className="text-gray-400">Title</p>
                  <p>{TITLE}</p>
                </li> }
             {ORI_URL &&   <li className="grid grid-cols-2 gap-5 py-[14px] border-b border-gray-100" style={{gridTemplateColumns: '200px 1fr'}}>
                  <p className="text-gray-400">Source</p>
                  <Link href={ORI_URL ? ORI_URL : ""} target="_blank" className={'underline text-blue-400 truncate'}>{ORI_URL}</Link>
                </li> }
                <li className="grid grid-cols-2 gap-5 py-[14px] border-b border-gray-100" style={{gridTemplateColumns: '200px 1fr'}}>
                  <p className="text-gray-400">Datasets</p>
                  {DATASET &&  
                    <article className="flex gap-2">
                      {DATASET.split(',').map((v: string, i: number) => (
                        <div
                        title={getTitleFromDataset(v)}
                          key={i}
                          className="flex items-center justify-center max-w-[110px] px-2 bg-gray-200 text-xs font-medium py-1.5  h-6 text-center rounded-20"
                        >
                          {v}
                        </div>
                      ))}
                    </article> 
                  }
                </li>
            {SUMMARY  &&    <li className="grid grid-cols-2 gap-5 py-[14px] border-b border-gray-100" style={{gridTemplateColumns: '200px 1fr'}}>
                  <p className="text-gray-400">Summary</p>
                  <p className={"overflow-auto break-words"}>{SUMMARY}</p>
                </li> }
             {KEYWORD &&   <li className="grid grid-cols-2 gap-5 py-[14px] border-b border-gray-100" style={{gridTemplateColumns: '200px 1fr'}}>
                  <p className="text-gray-400">Keyword</p>
                  <p>{KEYWORD}</p>
                </li>}
              </ul>
            )}
          </article>
        </div>
      ))}
    </main>
  );
};

export default Evidence;