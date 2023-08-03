import { useState,useMemo } from "react";
import Image from "next/image";

import arrow from "assets/icons/aml/arrow.png";
import bigArrow from "assets/icons/aml/bigArrow.png";
import { PEP_POSITIONS,Evidence } from "interfaces/detail";
import { useToggle } from "contexts/toggleContext";
import Link from "next/link";
import useTitleFromDataset from "utils/useTitleFromDataSet";

interface Props {
  data :PEP_POSITIONS[];
  evidenceData:Evidence[];
}


const PepPositions = ({data,evidenceData}:Props) => {
  const { state, dispatch } = useToggle();
  const toggle = (id: string) => {
    dispatch({ type: 'TOGGLE', id });
  }
  const [posType,setPosType] = useState(data.filter((pos)=>pos.CURRENT_CHECK ===1).length>0 ? "current" : "former");
  const positionData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((position:PEP_POSITIONS) => posType ==="current" ? position.CURRENT_CHECK ===1 : position.CURRENT_CHECK ===0);
  }, [data, posType]);

  const currentPos = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((position:PEP_POSITIONS) => position.CURRENT_CHECK ===1);
  }, [data]);

  const formerPos = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((position:PEP_POSITIONS) => position.CURRENT_CHECK ===0);
  }, [data]);

    function parseAndDecode(s:string) {
        return decodeURIComponent(s.replace(/uc([A-Fa-f0-9]{4})/g, "%u$1"));
    }

    const enhancedPositions = useMemo(() => {
        return positionData.map((position: PEP_POSITIONS) => {
            const EVENT_EVIDENCEIDArray = position.EVIDENCEID 
                ? position.EVIDENCEID.split(",") 
                : [];
            let relatedEvidences = evidenceData.filter((evidence: Evidence) => 
                evidence.EVIDENCEID && EVENT_EVIDENCEIDArray.includes(evidence.EVIDENCEID));
            relatedEvidences = relatedEvidences.sort((a, b) => {
                if(a.CAP_DATE === null || a.CAP_DATE === "Unknown") return 1;
                if(b.CAP_DATE === null || b.CAP_DATE === "Unknown") return -1;
    
                return new Date(b.CAP_DATE).getTime() - new Date(a.CAP_DATE).getTime();
            });
            return {...position, evidences: relatedEvidences};
        });
    }, [positionData, evidenceData]);

    const getTitleFromDataset = useTitleFromDataset();

  return (
    <main className="max-w-1320 mx-auto py-8 rounded-20 bg-white my-5 text-[#111111]">
      <div className={'font-bold flex items-center pb-5 px-10'}>
    {(data && data[0] && data[0].PEP_TIER) &&data[0].PEP_TIER}
      </div>
      <div className={'flex '}>
      {currentPos.length >0 && <article onClick={()=>setPosType("current")} className={`ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900  ${posType ==="current" && "bg-gray-900 text-white " }  w-fit`}>
        Current Positions ({currentPos.length})
      </article>}
     {formerPos.length >0 && <article onClick={()=>setPosType("former")} className={`ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900  ${posType ==="former" && "bg-gray-900 text-white " } w-fit`}>
        Former Positions ({formerPos.length})
      </article> }
      </div>
      {enhancedPositions.map(({evidences,WE_CD, POSITION_NAME, SEG, DATEFROM, DATETO,COUNTRY,EVIDENCEID }: PEP_POSITIONS, i:number) => (
        <div
          key={i}
          className={`pb-6 
          ${i !== enhancedPositions.length - 1 && "border-b-[5px] border-gray-100"}`}
        >
          <section className="mt-10 pb-6 border-b border-gray-100 px-8">
            <h1 className="text-xl mb-2">
            {parseAndDecode(POSITION_NAME as string)}
            </h1>
            <p className="text-gray-700">
                {SEG}{SEG ? " in " + COUNTRY : COUNTRY}
            </p>
            <p className="text-gray-700">
                {DATEFROM ? DATEFROM : "Unknown"}{" to "}{DATETO ? DATETO : "Unknown"}
            </p>
          </section>

        {EVIDENCEID &&  <section className="pt-7 px-8 border-t border-gray-100">
            <article
              className="flex items-center gap-2 mb-[14px] cursor-pointer"
              onClick={() => toggle(`pepEvidenceOpen${WE_CD}${i}`)}
            >
              <h1 className="text-xl">{EVIDENCEID.split(",").length} Evidence</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!state[`pepEvidenceOpen${WE_CD}${i}`] && "rotate-180"}`}
              />
            </article>
   {state[`pepEvidenceOpen${WE_CD}${i}`] && evidences &&
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
                            }:Evidence, i:number) => (
                              <article
                                key={i}
                                className={`py-6 px-8 bg-gray-50 border-y border-gray-200 
                            ${i !== evidences.length - 1 && "mb-4"}`}
                              >
                                <div
                                  className="flex items-center justify-between gap-2 mb-2.5 cursor-pointer"
                                  onClick={() => toggle(`pepEvidenceDetailOpen${WE_CD}${i}`)
                                  }
                                >
                                  <p className="font-bold text-lg">{TITLE ? EVIDENCEID + " : " + TITLE : EVIDENCEID}</p>
                                  <Image
                                    src={bigArrow}
                                    alt=""
                                    className={`${
                                      !state[`pepEvidenceDetailOpen${WE_CD}${i}`] && "rotate-180"
                                    }`}
                                  />
                                </div>
                                {state[`pepEvidenceDetailOpen${WE_CD}${i}`] && (
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
          </section>}
        </div>
      ))}
    </main>
  );
};

export default PepPositions;
