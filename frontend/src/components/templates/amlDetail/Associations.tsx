import { useState,useMemo,Dispatch,SetStateAction } from "react";
import { ASSOCIATIONS } from "interfaces/detail";
import useTitleFromDataset from "utils/useTitleFromDataSet";

interface Props {
  data :ASSOCIATIONS[];
  setMenu:Dispatch<SetStateAction<number>>
}

const Associations = ({data}:Props) => {
  const getTitleFromDataset = useTitleFromDataset();

  const [associationType,setAssociationType] = useState(data.filter((association:ASSOCIATIONS)=>association.INDIVIDUAL ===0).length>0 ?"Relative" : "Business");

  const associationData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((association:ASSOCIATIONS) => associationType === "Relative" ? association.INDIVIDUAL ===0 : association.INDIVIDUAL ===1);
  }, [data, associationType]);

  const individualAssociation = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((association:ASSOCIATIONS) => association.INDIVIDUAL ===0);
  }, [data]);

  const businessAssociation = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((association:ASSOCIATIONS) => association.INDIVIDUAL ===1);
  }, [data]);

  return (
    <main className="max-w-1320 mx-auto py-8 rounded-20 bg-white my-7 text-[#111111]">
      <section className="flex gap-2.5 mb-10 overflow-scroll scrollbar-hide">
      <div className={'flex '}>
      {individualAssociation.length > 0 &&<article onClick={()=>setAssociationType("Relative")} className={`ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900 ${associationType ==="Relative" && "bg-gray-900 text-white " } w-fit`}>
        Relatives & Close Associations ({individualAssociation.length})
      </article>}
    {businessAssociation.length>0 &&  <article onClick={()=>setAssociationType("Business")} className={`ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900 ${associationType ==="Business" && "bg-gray-900 text-white " } w-fit`}>
        Associated Business ({businessAssociation.length})
      </article>}
      </div>
      </section>
      <section className="px-8">
        <ul>
          {associationData
            .map(({ FIRSTNAME,MIDDLENAME ,SURNAME,RELATIONSHIP, DATASET, NAME,INDIVIDUAL,WE_RELATION }:ASSOCIATIONS, i:number) => (
              <li key={i} className="flex mb-10 justify-between">
                <div className="flex-1 min-w-[50%]">
                  {<p className={`font-semibold  mb-2 ${(INDIVIDUAL===0 && WE_RELATION) ? "text-blue-400 cursor-pointer underline " : "text-black "} `} onClick={()=>{(INDIVIDUAL === 0 && WE_RELATION) && window.open(`/individual/${WE_RELATION}`, "_blank") }}>
                  { INDIVIDUAL === 0 ? 
    [FIRSTNAME, MIDDLENAME, SURNAME].filter(Boolean).join(' ') 
    : NAME && NAME 
}
                  </p>}
                  <p className="text-gray-700">{RELATIONSHIP && RELATIONSHIP}</p>
                </div>
                <div className="gap-2 h-full max-w-[365px] flex flex-wrap">
                  {DATASET && DATASET.split(",").map((v: string, i: number) => (
                    <div
                    title={getTitleFromDataset(v)}
                      key={i}
                      className="flex justify-center items-center px-2 max-w-[110px] h-6 bg-gray-200 rounded-20 text-center py-1.5 text-xs"
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
