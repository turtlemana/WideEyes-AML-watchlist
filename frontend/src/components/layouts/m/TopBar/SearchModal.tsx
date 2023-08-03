import Image from "next/image";

import search from "assets/icons/header/search.png";
import { IMAGES } from "datas/weather";
import { COLORS, TRENDING_LIST } from "datas/main";

const SearchModal = () => {
  return (
    <main className="fixed top-16 left-0 w-full h-full bg-white z-20 py-6 px-5 overflow-auto pb-20">
      <section className="w-full h-10 mb-5 py-2.5 px-4 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
        <Image src={search} alt="search" className="mr-2 w-4 h-4" />
        <input
          placeholder="Search"
          className="outline-none text-[#111111] text-sm"
        />
      </section>
      <section>
        <article className="flex mb-5">
          <h6 className="text-[#0148FF] mr-1">{TRENDING_LIST.length}</h6>
          <h6 className="text-[#111111]">Result</h6>
        </article>
        <article>
          {TRENDING_LIST.map(
            ({ id, image, name, subName, risk, weatherIcon }) => (
              <div
                className="border-b border-gray-100 flex items-center"
                key={id}
              >
                <div className="flex items-center py-3 flex-1">
                  <Image src={image || ""} alt="" className="h-10 mr-3" />
                  <div>
                    <h6 className="text-sm">{name}</h6>
                    <p className="text-gray-500 text-xs">{subName}</p>
                  </div>
                </div>
                <div
                  className={`py-1 px-3 rounded-20 text-xs font-semibold ${COLORS[risk]}`}
                >
                  {risk}
                </div>
                <Image src={IMAGES[weatherIcon]} alt="" className="ml-3" />
              </div>
            )
          )}
        </article>
      </section>
    </main>
  );
};

export default SearchModal;
