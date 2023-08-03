import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

import info from "assets/icons/aml/info.svg";
import arrow from "assets/icons/aml/arrow.svg";
import search from "assets/icons/header/search.png";
import blueArrow from "assets/icons/aml/blueArrow.svg";
import {
  LOCATIONS,
  DATASETS,
  VIEWS,
  SEARCH_TYPE,
  SEARCH_OPTION,
  BIRTH,
} from "datas/aml";

const DEFAULT_STATE = {
  viewItems: 0,
  type: 0,
  fullName: "",
  day: "",
  month: "",
  year: "",
};

const Top = ({ setViews }: { setViews: Dispatch<SetStateAction<number>> }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [location, setLocation] = useState(0);
  const [birth, setBirth] = useState(0);
  const [searchType, setSearchType] = useState(0);
  const [searchOption, setSearchOption] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBirthActive, setIsBirthActive] = useState(false);
  const [isDatasetOpen, setIsDatasetOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCountryActive, setIsCountryActive] = useState(false);

  const handleReset = () => {
    setIsSearchActive(false);
    setSearchType(0);
    setLocation(0);
    setViews(20);
    setBirth(0);
    setState(DEFAULT_STATE);
  };

  return (
    <main className="text-[#111111] text-sm">
      <section className="pl-5 relative pb-7 border-b-[6px] border-gray-50">
        <div
          onClick={() => setIsSearchActive(!isSearchActive)}
          className={`cursor-pointer border rounded-20 w-[169px] py-2.5 px-3 flex justify-between text-gray-600 ${
            isSearchActive ? "border-[#0198FF]" : "border-gray-200 "
          } `}
        >
          <p className={`${isSearchActive && "text-[#0198FF]"}`}>
            {SEARCH_OPTION[searchOption].title}
          </p>
          <Image src={isSearchActive ? blueArrow : arrow} alt="" />
        </div>
        {isSearchActive && (
          <div className="ml-5 z-10 absolute top-11 left-0 bg-white py-3 px-2 border-gray-200 border rounded-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] w-[169px]">
            {SEARCH_OPTION.map(({ id, title }) => (
              <div
                key={id}
                className="gap-2 px-3 py-1.5 cursor-pointer"
                onClick={() => {
                  setIsSearchActive(false);
                  setSearchOption(id);
                }}
              >
                <h6
                  className={`mt-px ${
                    searchOption === id ? "text-[#0198FF]" : "text-gray-500"
                  }`}
                >
                  {title}
                </h6>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-7 pl-5 flex gap-3 text-lg">
        {SEARCH_TYPE.map(({ id, title }) => (
          <h1
            className={`${searchType !== id && "text-gray-300"} cursor-pointer`}
            onClick={() => setSearchType(id)}
            key={id}
          >
            {title}
          </h1>
        ))}
      </section>

      {searchType === 1 ? (
        <section className="px-5 py-5">
          <article className="w-full py-2.5 px-3.5 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
            <Image src={search} alt="search" className="mr-2 w-4 h-4 " />
            <input
              placeholder="Search Name"
              className="outline-none h-[18px]"
              value={state.fullName}
              onChange={(e) => setState({ ...state, fullName: e.target.value })}
            />
          </article>
        </section>
      ) : (
        <>
          <section className="px-5 pb-7 pt-5 border-b-[6px] border-gray-50 ">
            <h6 className="mb-3">Fullname</h6>
            <article className="py-2.5 px-3 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563] mb-7">
              <Image src={search} alt="search" className="mr-2 w-4 h-4 " />
              <input
                placeholder="Search Name"
                className="outline-none h-[18px]"
                value={state.fullName}
                onChange={(e) =>
                  setState({ ...state, fullName: e.target.value })
                }
              />
            </article>
            <div className="max-w-[170px] w-full mb-7">
              <h6 className="mb-3">Date of Birth</h6>
              <article className="flex items-center gap-1 text-sm">
                <input
                  placeholder="dd"
                  className="outline-none border-b border-solid border-gray-500 w-[40px] p-2 bg-amber-50"
                  value={state.day}
                  maxLength={2}
                  onChange={(e) => setState({ ...state, day: e.target.value })}
                />
                <input
                  placeholder="mm"
                  className="outline-none border-b border-solid border-gray-500 w-[40px] p-2 bg-amber-50"
                  maxLength={2}
                  value={state.month}
                  onChange={(e) =>
                    setState({ ...state, month: e.target.value })
                  }
                />
                <input
                  placeholder="yyyy"
                  className="outline-none border-b border-solid border-gray-500 w-[70px] p-2 bg-amber-50"
                  maxLength={4}
                  value={state.year}
                  onChange={(e) => setState({ ...state, year: e.target.value })}
                />
              </article>
            </div>

            <div className="w-full max-w-[200px] mb-7">
              <h6 className="mb-3">Birth Year Range</h6>
              <article className="flex gap-4 items-center relative justify-between min-w-80">
                <div
                  onClick={() =>
                    state.year.length === 4 && setIsBirthActive(!isBirthActive)
                  }
                  className={`cursor-pointer border rounded-20 w-full max-h-10 py-2 px-3.5 flex justify-between 
                  ${isBirthActive ? "border-[#0198FF]" : "border-gray-200 "} 
                  ${state.year.length < 4 && "bg-gray-100 cursor-default"} 
                  `}
                >
                  <p
                    className={`text-sm ${
                      isBirthActive ? "text-[#0198FF]" : "text-gray-600"
                    }`}
                  >
                    {BIRTH[birth].title}
                  </p>
                  {isBirthActive ? (
                    <Image src={blueArrow} alt="" />
                  ) : (
                    <Image src={arrow} alt="" />
                  )}
                </div>
                {isBirthActive && (
                  <div
                    className={`z-10 absolute top-11 right-0 bg-white py-3 px-2 border-gray-200 border rounded-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] w-full`}
                  >
                    {BIRTH.map(({ id, title }) => (
                      <div
                        key={id}
                        className={`flex gap-2 px-3 py-1.5 cursor-pointer`}
                        onClick={() => {
                          setBirth(id);
                          setIsBirthActive(false);
                        }}
                      >
                        <h6
                          className={`text-sm mt-px ${
                            birth === id ? "text-[#0198FF]" : "text-gray-500"
                          }`}
                        >
                          {title}
                        </h6>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </div>

            <div className="w-full">
              <h6 className="mb-3">Country or Nationality</h6>
              <article className="flex gap-4 items-center relative justify-between min-w-80">
                <div
                  onClick={() => setIsCountryActive(!isCountryActive)}
                  className={`cursor-pointer border rounded-20 w-full max-h-10 py-2 px-3.5 flex justify-between ${
                    isCountryActive ? "border-[#0198FF]" : "border-gray-200 "
                  } `}
                >
                  <p
                    className={`text-sm ${
                      isCountryActive ? "text-[#0198FF]" : "text-gray-600"
                    }`}
                  >
                    {LOCATIONS[location].title}
                  </p>
                  {isCountryActive ? (
                    <Image src={blueArrow} alt="" />
                  ) : (
                    <Image src={arrow} alt="" />
                  )}
                </div>
                {isCountryActive && (
                  <div
                    className={`z-10 absolute top-11 right-0 bg-white py-3 px-2 border-gray-200 border rounded-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] w-full`}
                  >
                    {LOCATIONS.map(({ id, title }) => (
                      <div
                        key={id}
                        className={`flex gap-2 px-3 py-1.5 cursor-pointer`}
                        onClick={() => {
                          setLocation(id);
                          setIsCountryActive(false);
                        }}
                      >
                        <h6
                          className={`text-sm mt-px ${
                            location === id ? "text-[#0198FF]" : "text-gray-500"
                          }`}
                        >
                          {title}
                        </h6>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </div>
          </section>

          <section className="px-5 py-7 border-b-[6px] border-gray-50 ">
            <section className="pb-5 ">
              <ul className="flex gap-[10px] overflow-scroll w-full scrollbar-hide items-center">
                {DATASETS.map(({ id, title, color, text }) => (
                  <li
                    key={id}
                    className={`min-w-fit rounded-20 px-3.5 py-1.5 text-center cursor-pointer max-h-[28px] ${color}`}
                  >
                    <h6 className={`text-sm ${text}`}>{title}</h6>
                  </li>
                ))}
              </ul>
            </section>
            <article
              className={`flex items-center justify-between cursor-pointer 
              ${isDatasetOpen && "mb-3"}`}
              onClick={() => setIsDatasetOpen((prev) => !prev)}
            >
              <div
                className={`text-sm h-[18px] cursor-pointer mt-3 
                ${!isDatasetOpen ? "text-[#0085e6]" : "text-gray-300"}`}
              >
                Choose Dataset
              </div>
              <Image
                src={arrow}
                alt=""
                className={`${isDatasetOpen && "rotate-180"}`}
              />
            </article>
            {isDatasetOpen && (
              <section className="pb-5 ">
                <ul>
                  <li className="flex w-full mb-3 gap-10 pt-3">
                    <p className="cursor-pointer text-gray-300">Select all</p>
                    <p className="cursor-pointer text-[#0085e6]">Clear all</p>
                  </li>
                  {DATASETS.map(({ id, content }) => (
                    <li
                      key={id}
                      className={
                        "min-w-fit py-1.5 text-center cursor-pointer max-h-[30px]"
                      }
                    >
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer"
                          id={`checkbox${id}`}
                        />
                        <label
                          className="customCheckbox"
                          htmlFor={`checkbox${id}`}
                        >
                          <h6 className="text-gray-500 font-medium cursor-pointer">
                            {content}
                          </h6>
                        </label>
                      </div>
                    </li>
                  ))}
                  <li className="mt-5 flex items-start gap-1.5 text-gray-500 text-xs">
                    <Image src={info} alt="info" className="w-3 h-3" />
                    <div>
                      Use <span className="text-[#0085e6]">Legacy Search </span>
                      for Corporate Registry, Charities Commission, Watchlist
                      and Cannabis Related Business.
                    </div>
                  </li>
                </ul>
              </section>
            )}
          </section>

          <section className="px-5 py-7 flex justify-between">
            <button onClick={handleReset} className="underline text-[#0198ff]">
              All reset
            </button>
            <div className="flex">
              <article className="ml-[30px] mr-2 flex gap-4 items-center relative justify-between min-w-80">
                <div
                  onClick={() => setIsActive(!isActive)}
                  className={`cursor-pointer border rounded-20 w-[150px] max-h-10 py-2 px-3.5 flex justify-between ${
                    isActive ? "border-[#0198FF]" : "border-gray-200 "
                  } `}
                >
                  <p
                    className={`${
                      isActive ? "text-[#0198FF]" : "text-gray-600"
                    }`}
                  >
                    {VIEWS[state.viewItems].title}
                  </p>
                  {isActive ? (
                    <Image src={blueArrow} alt="" />
                  ) : (
                    <Image src={arrow} alt="" />
                  )}
                </div>
                {isActive && (
                  <div
                    className={`z-10 absolute top-11 right-0 bg-white py-3 px-2 border-gray-200 border rounded-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] ${"w-[150px]"}`}
                  >
                    {VIEWS.map(({ id, title, content }) => (
                      <div
                        key={id}
                        className={`flex gap-2 px-3 py-1.5 cursor-pointer`}
                        onClick={() => {
                          setState({ ...state, viewItems: id });
                          setViews(content);
                          setIsActive(false);
                        }}
                      >
                        <h6
                          className={`mt-px ${
                            state.viewItems === id
                              ? "text-[#0198FF]"
                              : "text-gray-500"
                          }`}
                        >
                          {title}
                        </h6>
                      </div>
                    ))}
                  </div>
                )}
              </article>
              <button className="max-h-10 py-3 px-5 bg-[#0198ff] rounded-20 hover:bg-[#0085E6]">
                <h1 className="text-white">Search</h1>
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Top;
