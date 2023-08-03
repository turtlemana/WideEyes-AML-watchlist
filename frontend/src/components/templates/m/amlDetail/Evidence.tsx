import { useState } from "react";
import Image from "next/image";

import arrow from "assets/icons/aml/arrow.png";
import { EVIDENCE_DATAS, EVIDENCE_MENUS } from "datas/aml";
import { EVIDENCE } from "types/aml";

const Evidence = () => {
  const [menu, setMenu] = useState(0);
  const [openEvidenceIndex, setOpenEvidenceIndex] = useState(-1);
  const array: EVIDENCE[] = new Array(5).fill(EVIDENCE_DATAS[0]);

  return (
    <main className="py-7 bg-white text-[#111111] text-sm">
      <section className="px-5 flex gap-2.5 mb-8 overflow-scroll scrollbar-hide">
        {EVIDENCE_MENUS.map(({ id, title }) => (
          <article
            key={id}
            onClick={() => setMenu(id)}
            className={`min-w-fit h-9 py-2 px-2.5 border border-solid rounded-20 font-bold cursor-pointer
            ${
              id === menu
                ? "border-gray-900 text-white bg-gray-900"
                : "border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            }`}
          >
            {title}
          </article>
        ))}
      </section>

      {array.map(({ title, evidence }, i) => (
        <div key={i} className={`${i !== array.length - 1 && "mb-5"} px-5`}>
          <article
            className={`p-4 bg-gray-50 rounded-[8px] 
                        ${i !== array.length - 1 && "mb-4"}`}
          >
            <article
              className="flex items-start gap-2 mb-4 cursor-pointer"
              onClick={() =>
                setOpenEvidenceIndex((prev) => (prev === i ? -1 : i))
              }
            >
              <h1>{title}</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!openEvidenceIndex && "rotate-180"} w-4 h-4`}
              />
            </article>
            {openEvidenceIndex === i && (
              <ul className="font-medium text-gray-400">
                <li className="flex mb-2 items-center justify-between">
                  <p className="text-xs">Captured</p>
                  <p className="text-gray-700">{evidence.captured}</p>
                </li>
                <li className="flex mb-2 items-center justify-between">
                  <p className="text-xs">Title</p>
                  <p className="text-gray-700">{evidence.title}</p>
                </li>
                <li className="flex mb-2 items-center justify-between">
                  <p className="text-xs">Source</p>
                  <p className="text-gray-700">{evidence.source}</p>
                </li>
                <li className="flex mb-2 items-center justify-between">
                  <p className="text-xs">Datasets</p>
                  <article className="flex gap-2">
                    {evidence.datasets.map((v, i) => (
                      <div
                        key={i}
                        className="bg-gray-200 py-1 text-[#111111] w-[42px] h-6 text-center rounded-20"
                      >
                        {v}
                      </div>
                    ))}
                  </article>
                </li>
                <li className="flex mb-2 items-center justify-between">
                  <p className="text-xs">Summary</p>
                  <p className="text-gray-700">{evidence.summary}</p>
                </li>
                <li className="flex mb-2 items-center justify-between">
                  <p className="text-xs">High Credibility Score</p>
                  <p className="text-gray-700">{evidence.score}</p>
                </li>
              </ul>
            )}
          </article>
        </div>
      ))}
    </main>
  );
};

export default Evidence;
