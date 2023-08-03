import { useState } from "react";

import { DATA } from "datas/aml";
import Top from "components/templates/m/amlDetail/Top";
import Core from "components/templates/m/amlDetail/Core";
import Associations from "components/templates/m/amlDetail/Associations";
import Sanctions from "components/templates/m/amlDetail/Sanctions";
import Risks from "components/templates/m/amlDetail/Risks";
import Others from "components/templates/m/amlDetail/Others";
import Evidence from "components/templates/m/amlDetail/Evidence";

const DETAIL_MENUS = [
  { id: 0, title: "Profile Details" },
  { id: 1, title: "Associations" },
  { id: 2, title: "Sanctions" },
  { id: 3, title: "Rep. Risks" },
  { id: 4, title: "Other Datasets" },
  { id: 5, title: "Evidence" },
];

const Detail = () => {
  const [menu, setMenu] = useState(0);

  return (
    <div className="bg-gray-50">
      <Top data={DATA} />

      <article className="mt-1.5 pt-5 px-5 bg-white flex items-center gap-6 overflow-scroll w-full scrollbar-hide border-b border-gray-200">
        {DETAIL_MENUS.map(({ id, title }) => (
          <h1
            key={id}
            onClick={() => setMenu(id)}
            className={`cursor-pointer min-w-fit pb-2 
              ${
                menu === id
                  ? "text-[#111111] border-b-[3px] border-[#111111]"
                  : "text-gray-300 hover:text-gray-400"
              }`}
          >
            {title}
          </h1>
        ))}
      </article>
      {
        [
          <Core key="core" />,
          <Associations key="associations" />,
          <Sanctions key="sanctions" />,
          <Risks key="risks" />,
          <Others key="others" />,
          <Evidence key="evidence" />,
        ][menu]
      }
    </div>
  );
};
export default Detail;
