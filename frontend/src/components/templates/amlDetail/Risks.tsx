import {useMemo } from "react";
import Image from "next/image";

import arrow from "assets/icons/aml/arrow.png";
import bigArrow from "assets/icons/aml/bigArrow.png";
import { RISKS_DATAS } from "datas/aml";
import { useToggle } from "contexts/toggleContext";
import Link from "next/link";
import { REPUTATIONAL_RISK,Evidence } from "interfaces/detail";
import useTitleFromDataset from "utils/useTitleFromDataSet";


interface Props {
  data :REPUTATIONAL_RISK[];
  evidenceData:Evidence[];
}


const Risks = ({data,evidenceData}:Props) => {
  const array = new Array(5).fill(RISKS_DATAS[0].data);
  const { state, dispatch } = useToggle();
  const toggle = (id: string) => {
    dispatch({ type: 'TOGGLE', id });
  }

  const createEvents = (dataItem: REPUTATIONAL_RISK) => {
    const eventTypes = dataItem.EVENT_TYPE ?  dataItem.EVENT_TYPE.split(",") : "";
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

  const enhancedRisks = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    
    return data.map((dataItem: REPUTATIONAL_RISK) => ({
      ...dataItem,
      events: createEvents(dataItem),
    }))
    
  }, [data,evidenceData]);

  const getTitleFromDataset = useTitleFromDataset();


  return (
    <main className="max-w-1320 mx-auto py-8 rounded-20 bg-white my-5 text-[#111111]">
      <article className="ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900 text-white bg-gray-900 w-fit">
        Reputational Risk Exposure ({data.length})
      </article>
      {enhancedRisks.map(({WE_CD,events, EVENT_DATE, EVENT_EVIDENCEID, EVENT_TYPE,REPUTATION_ID,SUB_CATEGORY,CATEGORY }: REPUTATIONAL_RISK, i:number) => (
        <div
          key={i}
          className={`pb-6 
          ${i !== array.length - 1 && "border-b-[5px] border-gray-100"}`}
        >
          <section className="mt-10 border-b border-gray-100 px-8">
            <h1 className="text-xl mb-2">{CATEGORY}</h1>
            <p className="text-gray-700 mb-3">{SUB_CATEGORY}</p>
          </section>

         {EVENT_TYPE && <section className="pt-7 px-8 border-t border-gray-100">
            <article
              className="flex items-center gap-2 mb-[14px] cursor-pointer"
              onClick={() => toggle(`riskEventOpen${WE_CD}${i}`)}
            >
              <h1 className="text-xl">{events && events.length} Event</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!state[`riskEventOpen${WE_CD}${i}`] && "rotate-180"}`}
              />
            </article>
            
            <ul>
                  <li className={`${i !== EVENT_TYPE.split(",").length - 1 && "pb-8"}`}>
                    {state[`riskEventOpen${WE_CD}${i}`] && events && 
                      events.map(
                        (
                          { type,evidences, date,evidenceId}:{type:string; evidences:Evidence[]; date:string; evidenceId:string;},
                          k:number
                        ) => (
                          <article
                            key={k}
                            className={`py-6 px-8 bg-gray-50 border-y border-gray-200 
                        ${i !== events.length - 1 && "mb-4"}`}
                          >
                            <div className={'flex font-semibold'}>
                              {type}
                            </div>
                            {date && <div className={'flex'}>
                              {date}
                            </div>}
                            <div
                              className="flex items-center gap-2 mb-2.5 cursor-pointer"
                              onClick={() => toggle(`riskEvidenceOpen${type}${i}${k}`)}
                            >
                            {evidenceId &&  <p className="text-gray-500 font-semibold text-md">{evidenceId.length}{" "}{"Evidence"}</p>}
                              <Image
                                src={bigArrow}
                                alt=""
                                className={`${
                                  !state[`riskEvidenceOpen${type}${i}${k}`] && "rotate-180"
                                }`}
                              />
                            </div>
                            {state[`riskEvidenceOpen${type}${i}${k}`] && evidences &&
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
                              onClick={() => toggle(`riskEvidenceDetailOpen${type}${i}${j}`)
                              }
                            >
                              <p className="font-bold text-lg">{TITLE ? EVIDENCEID + " : " + TITLE : EVIDENCEID}</p>
                              <Image
                                src={bigArrow}
                                alt=""
                                className={`${
                                  !state[`riskEvidenceDetailOpen${type}${i}${j}`] && "rotate-180"
                                }`}
                              />
                            </div>
                            {state[`riskEvidenceDetailOpen${type}${i}${j}`] && (
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
   
                          </article>
                        )
                      )}
                  </li>
                </ul>
            
          </section>}
        </div>
      ))}
    </main>
  );
};

export default Risks;
