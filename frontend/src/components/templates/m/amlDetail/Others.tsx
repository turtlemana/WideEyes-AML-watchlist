import { useState } from "react";
import Image from "next/image";

import arrow from "assets/icons/aml/arrow.png";
import bigArrow from "assets/icons/aml/bigArrow.png";
import { OTHERS_DATAS, OTHERS_MENUS } from "datas/aml";
import { OTHERS } from "types/aml";

const Others = () => {
  const [menu, setMenu] = useState(0);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [isPositionOpen, setIsPositionOpen] = useState(false);
  const [isEvidenceDetailOpen, setIsEvidenceDetailOpen] = useState(false);
  const array: OTHERS[] = new Array(1).fill(OTHERS_DATAS[0]);

  return (
    <main className="pt-7 bg-white text-[#111111] text-sm pb-[44px]">
      <section className="flex gap-2.5 mb-8 px-5 overflow-scroll scrollbar-hide">
        {OTHERS_MENUS.map(({ id, title }) => (
          <article
            key={id}
            onClick={() => setMenu(id)}
            className={`min-w-fit py-2 px-2.5 border rounded-20 font-bold cursor-pointer
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

      {array.map(({ event }, i) => (
        <div
          key={i}
          className={`pb-6 
          ${i !== array.length - 1 && "border-b-[5px] border-gray-100"}`}
        >
          {event.map(({ title, date, evidence, position }, i) => (
            <div key={i}>
              <section className="px-5 mb-4">
                <h6 className="text-base mb-1.5">{title}</h6>
                <p className="text-xs text-gray-500">{date}</p>
              </section>

              <section className="px-5 ">
                <article
                  className="flex items-center gap-2 mb-4 cursor-pointer"
                  onClick={() => setIsEvidenceOpen((prev) => !prev)}
                >
                  <h6 className="text-gray-500">1 Evidence</h6>
                  <Image
                    src={arrow}
                    alt=""
                    className={`${!isEvidenceOpen && "rotate-180"} w-4 h-4 `}
                  />
                </article>
                <ul>
                  <li className={`${i !== event.length - 1 && "pb-8"}`}>
                    {isEvidenceOpen &&
                      evidence.map(
                        (
                          { title, captured, source, datasets, summary, score },
                          i
                        ) => (
                          <article
                            key={i}
                            className={`p-4 bg-gray-50 
                        ${i !== evidence.length - 1 && "mb-4"}`}
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
                              <ul className="font-medium text-gray-400">
                                <li className="flex mb-2 items-center justify-between">
                                  <p className="text-xs">Captured</p>
                                  <p className="text-gray-700">{captured}</p>
                                </li>
                                <li className="flex mb-2 items-center justify-between">
                                  <p className="text-xs">Title</p>
                                  <p className="text-gray-700">{title}</p>
                                </li>
                                <li className="flex mb-2 items-center justify-between">
                                  <p className="text-xs">Source</p>
                                  <p className="text-gray-700">{source}</p>
                                </li>
                                <li className="flex mb-2 items-center justify-between text-xs">
                                  <p>Datasets</p>
                                  <article className="flex gap-1">
                                    {datasets.map((v, i) => (
                                      <div
                                        key={i}
                                        className="bg-gray-200 py-1.5 w-[42px] h-6 text-center rounded-20 text-[#111111]"
                                      >
                                        {v}
                                      </div>
                                    ))}
                                  </article>
                                </li>
                                <li className="flex mb-2 items-center justify-between">
                                  <p className="text-xs">Summary</p>
                                  <p className="text-gray-700">{summary}</p>
                                </li>
                                <li className="flex mb-2 items-center justify-between">
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
                </ul>
              </section>

              <section className="pt-4 px-5 ">
                <article
                  className="flex items-center gap-2 mb-4 cursor-pointer"
                  onClick={() => setIsPositionOpen((prev) => !prev)}
                >
                  <h6 className="text-gray-500">1 Position</h6>
                  <Image
                    src={arrow}
                    alt=""
                    className={`w-4 h-4 ${!isPositionOpen && "rotate-180"}`}
                  />
                </article>
                <ul>
                  {position.map(({ title, content, date }, i) => (
                    <li
                      key={i}
                      className={`${i !== position.length - 1 && "pb-8"}`}
                    >
                      {isPositionOpen && (
                        <article
                          className={`p-4 bg-gray-50 rounded-[8px] text-gray-700
                        ${i !== position.length - 1 && "mb-4"}`}
                        >
                          <p className="font-medium">{title}</p>
                          <p className="my-2.5">{content}</p>
                          <p className="text-gray-500 text-xs">{date}</p>
                        </article>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
};

export default Others;
