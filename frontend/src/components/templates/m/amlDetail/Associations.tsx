import { useState } from "react";

import { ASSOCIATIONS, ASSOCIATIONS_MENUS } from "datas/aml";

const Associations = () => {
  const [menu, setMenu] = useState(0);

  return (
    <main className="py-7 bg-white text-[#111111] text-sm">
      <div className="flex px-5 gap-2.5 mb-10 overflow-scroll w-full scrollbar-hide">
        {ASSOCIATIONS_MENUS.map(({ id, title }) => (
          <article
            key={id}
            onClick={() => setMenu(id)}
            className={`min-w-fit py-2 px-2.5 border border-solid rounded-20 font-bold cursor-pointer
          ${
            id === menu
              ? "border-gray-900 text-white bg-gray-900"
              : "border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          }`}
          >
            {title}
          </article>
        ))}
      </div>
      <section className="px-5">
        <ul>
          {new Array(44)
            .fill(ASSOCIATIONS)
            .map(({ title, subTitle, dataSet }, i) => (
              <li key={i} className="mb-8">
                <p className="text-[#0148FF] underline font-medium mb-2">
                  {title}
                </p>
                <p className="text-gray-700 mb-4">{subTitle}</p>
                <div className="flex flex-wrap gap-1">
                  {dataSet.map((v: string, i: number) => (
                    <div
                      key={i}
                      className="w-[45px] h-6 bg-gray-200 rounded-20 text-center py-1.5 text-xs"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
};

export default Associations;
