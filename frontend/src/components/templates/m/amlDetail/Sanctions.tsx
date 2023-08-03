import { useState } from "react";
import Image from "next/image";

import arrow from "assets/icons/aml/arrow.png";
import bigArrow from "assets/icons/aml/bigArrow.png";
import { SANCTIONS_DATAS } from "datas/aml";
import { SANCTIONS } from "types/aml";

const Sanctions = () => {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isMeasuresOpen, setIsMeasuresOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [isEvidenceDetailOpen, setIsEvidenceDetailOpen] = useState(false);
  const array = new Array(1).fill(SANCTIONS_DATAS);

  return (
    <main className="py-7 bg-white text-[#111111] text-sm">
      <article className="ml-5 mb-8 py-2 px-2.5 border border-solid rounded-20 font-bold cursor-pointer border-gray-900 text-white bg-gray-900 w-fit">
        Current Sanctions (1)
      </article>

      {array.map(({ types, measures, events }: SANCTIONS, i) => (
        <div
          key={i}
          className={`pb-6 
          ${i !== array.length - 1 && "border-b-[5px] border-gray-100"}`}
        >
          <section className="px-5 pb-5 border-b border-gray-100">
            <h1 className="text-xl mb-2">
              Iran - Ministry of Foreign Affairs of the Islamic Republic of Iran
              - Sanctions List
            </h1>
            <p className="text-gray-700">
              Ministry of Foreign Affairs of the Islamic Republic of Iran - Iran
            </p>
          </section>

          <section className="py-4 px-5 pb-1 border-y border-gray-100">
            <article
              className="flex items-center gap-2 cursor-pointer mb-2"
              onClick={() => setIsTypeOpen((prev) => !prev)}
            >
              <h6>2 Sanction Types</h6>
              <Image
                src={arrow}
                alt=""
                className={`${!isTypeOpen && "rotate-180"} w-4 h-4`}
              />
            </article>
            {isTypeOpen && (
              <ul>
                {types.map(({ id, title }) => (
                  <li
                    key={id}
                    className={`py-3 
                    ${id !== types.length - 1 && "border-b border-gray-100"}`}
                  >
                    <p>{title}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="pt-4 px-5 pb-1 border-y border-gray-100">
            <article
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => setIsMeasuresOpen((prev) => !prev)}
            >
              <h6>2 Sanction Measures</h6>
              <Image
                src={arrow}
                alt=""
                className={`${!isMeasuresOpen && "rotate-180"} w-4 h-4`}
              />
            </article>
            {isMeasuresOpen && (
              <ul>
                {measures.map(({ id, title }) => (
                  <li
                    key={id}
                    className={`py-3 
                      ${
                        id !== measures.length - 1 && "border-b border-gray-100"
                      }`}
                  >
                    <p>{title}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="pt-4 pb-[68px] px-5 border-t border-gray-100">
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
            {isEventOpen && (
              <ul>
                {events.map(({ id, title, date, evidence }) => (
                  <li
                    key={id}
                    className={`${id !== events.length - 1 && "pb-5"}`}
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
                          published,
                          source,
                          datasets,
                          summary,
                          score,
                        }) => (
                          <article
                            key={id}
                            className={`p-4 bg-gray-50 rounded-[8px] ${
                              id !== evidence.length - 1 && "mb-5"
                            }`}
                          >
                            <div
                              className="flex items-center gap-2 mb-[18px] cursor-pointer"
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
                              <ul>
                                <li className="flex justify-between mb-3 font-medium text-gray-400">
                                  <p className="text-xs">Captured</p>
                                  <p className="text-gray-700">{captured}</p>
                                </li>
                                <li className="flex justify-between mb-3 font-medium text-gray-400">
                                  <p className="text-xs">Published</p>
                                  <p className="text-gray-700">{published}</p>
                                </li>
                                <li className="flex justify-between mb-3 font-medium text-gray-400">
                                  <p className="text-xs">Title</p>
                                  <p className="text-gray-700">{title}</p>
                                </li>
                                <li className="flex justify-between mb-3 font-medium text-gray-400">
                                  <p className="text-xs">Source</p>
                                  <p className="text-gray-700">{source}</p>
                                </li>
                                <li className="flex justify-between mb-3 font-medium text-gray-400 text-xs">
                                  <p>Datasets</p>
                                  <article className="flex gap-1">
                                    {datasets.map((v, i) => (
                                      <div
                                        key={i}
                                        className="bg-gray-200 py-[5px] w-[42px] h-6 text-center rounded-20 text-[#111111]"
                                      >
                                        {v}
                                      </div>
                                    ))}
                                  </article>
                                </li>
                                <li className="flex justify-between mb-3 font-medium text-gray-400">
                                  <p className="text-xs">Summary</p>
                                  <p className="text-gray-700">{summary}</p>
                                </li>
                                <li className="flex justify-between mb-3 font-medium text-gray-400">
                                  <p className="text-xs">
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
                ))}
              </ul>
            )}
          </section>
        </div>
      ))}
    </main>
  );
};

export default Sanctions;
