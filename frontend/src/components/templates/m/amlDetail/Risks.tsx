import { useState } from "react";
import Image from "next/image";

import arrow from "assets/icons/aml/arrow.png";
import bigArrow from "assets/icons/aml/bigArrow.png";
import { RISKS_DATAS } from "datas/aml";
import { RISKS } from "types/aml";

const Risks = () => {
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [isEvidenceDetailOpen, setIsEvidenceDetailOpen] = useState(false);
  const array = new Array(5).fill(RISKS_DATAS[0].data);

  return (
    <main className="py-7 bg-white text-[#111111] text-sm">
      <article className="ml-5 mb-8 py-2 px-2.5 border rounded-20 font-bold cursor-pointer border-gray-900 text-white bg-gray-900 w-fit">
        Reputational Risk Exposure (5)
      </article>

      {array.map(({ title, content, event }: RISKS, i) => (
        <div
          key={i}
          className={`py-7
          ${i !== array.length - 1 && "border-b-[6px] border-gray-100"}`}
        >
          <section className="border-b border-gray-100 px-5 pb-5">
            <h6 className="text-base mb-2">{title}</h6>
            <p className="text-gray-700">{content}</p>
          </section>

          <section className="pt-4 px-5">
            <article
              className="flex items-center gap-2 mb-4 cursor-pointer"
              onClick={() => setIsEventOpen((prev) => !prev)}
            >
              <h6>1 Event</h6>
              <Image
                src={arrow}
                alt=""
                className={`${!isEventOpen && "rotate-180"} w-4 h-4`}
              />
            </article>
            {isEventOpen &&
              event.map(({ id, title, date, evidence }, i) => (
                <ul key={i}>
                  <li
                    key={id}
                    className={`${id !== event.length - 1 && "pb-7"}`}
                  >
                    <h6 className="text-base mb-1.5">{title}</h6>
                    <p className="text-gray-500 text-xs mb-4">{date}</p>
                    <article
                      className="flex items-center gap-2 mb-4 cursor-pointer"
                      onClick={() => setIsEvidenceOpen((prev) => !prev)}
                    >
                      <h6 className="text-gray-500">1 Evidence</h6>
                      <Image
                        src={arrow}
                        alt=""
                        className={`${!isEvidenceOpen && "rotate-180"} w-4 h-4`}
                      />
                    </article>
                    {isEvidenceOpen &&
                      evidence.map(
                        ({
                          id,
                          title,
                          captured,
                          source,
                          datasets,
                          summary,
                          score,
                        }) => (
                          <article
                            key={id}
                            className={`p-4 bg-gray-50 rounded-[8px] 
                        ${id !== evidence.length - 1 && "mb-4"}`}
                          >
                            <div
                              className="flex items-center gap-2 mb-4 cursor-pointer"
                              onClick={() =>
                                setIsEvidenceDetailOpen((prev) => !prev)
                              }
                            >
                              <p className="font-medium">{title}</p>
                              <Image
                                src={bigArrow}
                                alt=""
                                className={`w-4 h-4 
                                ${!isEvidenceDetailOpen && "rotate-180"}`}
                              />
                            </div>
                            {isEvidenceDetailOpen && (
                              <ul className="font-medium">
                                <li className="flex justify-between mb-2">
                                  <p className="text-xs text-gray-400">
                                    Captured
                                  </p>
                                  <p className="text-gray-700">{captured}</p>
                                </li>
                                <li className="flex justify-between mb-2">
                                  <p className="text-xs text-gray-400">Title</p>
                                  <p className="text-gray-700">{title}</p>
                                </li>
                                <li className="flex justify-between mb-2">
                                  <p className="text-xs text-gray-400">
                                    Source
                                  </p>
                                  <p className="text-gray-700">{source}</p>
                                </li>
                                <li className="flex justify-between mb-2 text-xs">
                                  <p className="text-gray-400">Datasets</p>
                                  <article className="flex gap-1">
                                    {datasets.map((v, i) => (
                                      <div
                                        key={i}
                                        className="bg-gray-200 py-1.5 w-[42px] h-6 text-center rounded-20"
                                      >
                                        {v}
                                      </div>
                                    ))}
                                  </article>
                                </li>
                                <li className="flex justify-between mb-2">
                                  <p className="text-xs text-gray-400">
                                    Summary
                                  </p>
                                  <p className="text-gray-700">{summary}</p>
                                </li>
                                <li className="flex justify-between mb-2">
                                  <p className="text-xs text-gray-400">
                                    High Credibility Score
                                  </p>
                                  <p className="text-gray-700">{score}</p>
                                </li>
                              </ul>
                            )}
                          </article>
                        )
                      )}
                  </li>
                </ul>
              ))}
          </section>
        </div>
      ))}
    </main>
  );
};

export default Risks;
