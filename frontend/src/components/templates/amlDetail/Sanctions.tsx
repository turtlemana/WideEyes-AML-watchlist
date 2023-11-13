import { useState,useMemo } from "react";
import Image from "next/image";

import arrow from "assets/icons/aml/arrow.png";
import bigArrow from "assets/icons/aml/bigArrow.png";
import { SANCTIONS,Evidence } from "interfaces/detail";
import { useToggle } from "contexts/toggleContext";
import Link from "next/link";
import useTitleFromDataset from "utils/useTitleFromDataSet";

interface Props {
  data :SANCTIONS[];
  evidenceData:Evidence[];
}


const Sanctions = ({data,evidenceData}:Props) => {

  const [sanctionType,setSanctionType] = useState(data.filter((sanction)=> sanction.CUR ===1).length>0 ? "current" : "former");

  const { state, dispatch } = useToggle();
  const toggle = (id: string) => {
    dispatch({ type: 'TOGGLE', id });
  }


  const sanctionData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((evidence:SANCTIONS) => sanctionType ==="current" ? evidence.CUR ===1 : evidence.CUR ===0);
  }, [data, sanctionType]);

  const currentSanction = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((evidence:SANCTIONS) => evidence.CUR ===1);
  }, [data]);

  const formerSanction = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((evidence:SANCTIONS) => evidence.CUR ===0);
  }, [data]);

  const eventData = useMemo(() => {
    if (!sanctionData || sanctionData.length === 0) {
      return [];
    }
    return sanctionData.map((item:SANCTIONS)=>({
      eventType: item.EVENT_TYPE,
      eventDate: item.EVENT_DATE,
      evidenceId: item.EVENT_EVIDENCEID
    }));
  }, [sanctionData]);

  const getTitleFromDataset = useTitleFromDataset();


  const createEvents = (dataItem: SANCTIONS) => {
    const eventTypes = dataItem.EVENT_TYPE ?  dataItem.EVENT_TYPE.slice(1,-1).split(",") : "";
    const eventDate = dataItem.EVENT_DATE ? dataItem.EVENT_DATE.slice(1,-1).split(",") : "";
    const eventEvidenceIds =dataItem.EVENT_EVIDENCEID ? JSON.parse(dataItem.EVENT_EVIDENCEID.replace(/\b(\w+)\b/g, '"$1"')) : "";
  
    const events = [];

    for (let i = 0; i < eventTypes.length; i++) {
      let relatedEvidences = eventEvidenceIds[i].map((id:string) => evidenceData.find((evidence: Evidence) => evidence.EVIDENCEID === id)).filter(Boolean);
     
      relatedEvidences = relatedEvidences.sort((a:Evidence, b:Evidence) => {
        if(a.CAP_DATE === null || a.CAP_DATE === "Unknown") return 1;
        if(b.CAP_DATE === null || b.CAP_DATE === "Unknown") return -1;

        return new Date(b.CAP_DATE).getTime() - new Date(a.CAP_DATE).getTime();
      });
     
      events.push({
        type: eventTypes[i] || "",
        date: eventDate[i] || "",
        evidenceId: eventEvidenceIds[i] || "",
        evidences: relatedEvidences || [],
      });
    }
    return events;
  };
  

  const enhancedSanctionData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    const returnData =data.filter((sanction:SANCTIONS) => sanctionType === "current" ? sanction.CUR ===1 : sanction.CUR===0);
    return returnData.map((dataItem: SANCTIONS) => ({
      ...dataItem,
      events: createEvents(dataItem),
    }));
  }, [data, sanctionType]);


  return (
    <main className="max-w-1320 mx-auto py-8 rounded-20 bg-white my-5 text-[#111111]">
            <div className={'flex '}>
     {currentSanction.length>0 &&  <article onClick={()=>setSanctionType("current")} className={`ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900 ${sanctionType ==="current" && "bg-gray-900 text-white " } w-fit`}>
        Current Sanctions ({currentSanction.length})
      </article>}
    {formerSanction.length>0 && <article onClick={()=>setSanctionType("former")} className={`ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900 ${sanctionType ==="former" && "bg-gray-900 text-white " } w-fit`}>
        Former Sanctions ({formerSanction.length})
      </article>}
      </div>
      {enhancedSanctionData.map(({events, WE_CD,EVENT_DATE, EVENT_TYPE, EVENT_EVIDENCEID,MEASURE,REGIME_BODY,REGIME_NAME,REGIME_ORI,REGIME_TYPE,SANCTION_ID,SAN_NUM }: SANCTIONS, i:number) => (
        <div
          key={i}
          className={`pb-6 
          ${i !== sanctionData.length - 1 && "border-b-[5px] border-gray-100"}`}
        >
          <section className="mt-10 pb-6 border-b border-gray-100 px-8">
            <h1 className="text-xl mb-2">
              {REGIME_NAME}
            </h1>
            <p className="text-gray-700">
            {REGIME_BODY}{" - "}{REGIME_ORI}
            </p>
          </section>
        {REGIME_TYPE &&
          <section className="pt-7 px-8 pb-[14px] border-y border-gray-100">
            <article
              className="flex items-center gap-2 mb-[14px] cursor-pointer"
              onClick={() => toggle(`sanctionTypeOpen${WE_CD}${i}`)}
            >
              <h1 className="text-xl">{REGIME_TYPE.split(",").length}{" "}{"Sanction Types"}</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!state[`sanctionTypeOpen${WE_CD}${i}`] && "rotate-180"}`}
                />
            </article>
            {state[`sanctionTypeOpen${WE_CD}${i}`] && (
              <ul>
                {REGIME_TYPE.split(",").map((type:string,i:number) => (
                  <li
                    key={i}
                    className={`py-[14px] 
                    ${i !== REGIME_TYPE.split(",").length - 1 && "border-b border-gray-100"}`}
                  >
                    <p>{type}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>}
        {MEASURE &&
          <section className="pt-7 px-8 pb-[14px] border-y border-gray-100 ">
            <article
              className="flex items-center gap-2 mb-[14px] cursor-pointer"
              onClick={() => toggle(`sanctionMeasureOpen${WE_CD}${i}`)}
            >
              <h1 className="text-xl">{MEASURE.split(",").length}{" "}{"Sanction Measures"}</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!state[`sanctionMeasureOpen${WE_CD}${i}`] && "rotate-180"}`}
              />
            </article>
            {state[`sanctionMeasureOpen${WE_CD}${i}`] && (
              <ul>
                {MEASURE.split(",").map((measure:string,i:number) => (
                  <li
                    key={i}
                    className={`py-[14px] 
                      ${
                        i !== MEASURE.split(",").length - 1 && "border-b border-gray-100"
                      }`}
                  >
                    <p>{measure}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>}
{EVENT_TYPE &&
          <section className="pt-7 px-8 border-t border-gray-100">
            <article
              className="flex items-center gap-2 mb-[14px] cursor-pointer"
              onClick={() => toggle(`sanctionEventOpen${WE_CD}${i}`)}
            >
              <h1 className="text-xl">{EVENT_TYPE.slice(1,-1).split(",").length}{" "}{"Event"}</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!state[`sanctionEventOpen${WE_CD}${i}`] && "rotate-180"}`}
              />
            </article>
            {state[`sanctionEventOpen${WE_CD}${i}`]  && events &&
            
          
            events.map(
              (
                { type,evidences,evidenceId, date}:{type:string ,evidences:Evidence[],evidenceId:string, date:string},
                k:number
              ) => (
              
              
              <ul key={k}>
               
                  <li
                    key={k}
                    className={`${k !== eventData.length - 1 && "pt-8"}`}
                  >
                    <h6 className="text-lg mb-1">{type}</h6>
                    <p className="text-gray-500 text-sm mb-2">{date}</p>
                    <article
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                      onClick={() => toggle(`sanctionEvidenceOpen${WE_CD}${i}${k}`)}
                    >
                      <h6 className="text-gray-500">{evidenceId ? evidenceId.length +" "+"Evidence" : ""} </h6>
                      <Image
                        src={arrow}
                        alt=""
                        className={`${!state[`sanctionEvidenceOpen${WE_CD}${i}${k}`] && "rotate-180"}`}
                      />
                    </article>
                    {state[`sanctionEvidenceOpen${WE_CD}${i}${k}`] && evidences &&
                      evidences.map(
                        ({
                          CAP_DATE,
                          DATASET,
                          EVIDENCEID,
                          ORI_URL,
                          KEYWORD,
                          PUB_DATE,
                          SUMMARY,
                          TITLE,
                        }:Evidence, j:number) => (
                          <article
                            key={j}
                            className={`py-6 px-8 bg-gray-50 border-y border-gray-200 
                        ${i !== evidences.length - 1 && "mb-4"}`}
                          >
                            <div
                              className="flex items-center justify-between gap-2 mb-2.5 cursor-pointer"
                              onClick={() => toggle(`sanctionEvidenceDetailOpen${WE_CD}${i}${j}`)
                              }
                            >
                              <p className="font-bold text-lg">{TITLE ? EVIDENCEID + " : " + TITLE : EVIDENCEID}</p>
                              <Image
                                src={bigArrow}
                                alt=""
                                className={`${
                                  !state[`sanctionEvidenceDetailOpen${WE_CD}${i}${j}`] && "rotate-180"
                                }`}
                              />
                            </div>
                            {state[`sanctionEvidenceDetailOpen${WE_CD}${i}${j}`] && (
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
                        )
                      )}
                  </li>

              </ul>
            ))}
          </section>}
        </div>
      ))}
    </main>
  );
};

export default Sanctions;
