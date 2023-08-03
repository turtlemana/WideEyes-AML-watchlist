import { useState,useMemo } from "react";
import Image from "next/image";
import arrow from "assets/icons/aml/arrow.png";
import bigArrow from "assets/icons/aml/bigArrow.png";
import { useToggle } from "contexts/toggleContext";
import Link from "next/link";
import { OTHER_DATASET_DD,OTHER_DATASET_POI,OTHER_DATASET_REL, Evidence } from "interfaces/detail";
import useTitleFromDataset from "utils/useTitleFromDataSet";


interface Props {
  data:{
    regulatory:OTHER_DATASET_REL[] | null;
    poi:OTHER_DATASET_POI[] | null; 
    dd:OTHER_DATASET_DD[] | null;
  };
  evidenceData:Evidence[];
}


const Others = ({data,evidenceData}:Props) => {

  const [datasetType, setDatasetType] = useState(
    data && data.regulatory && data.regulatory.length > 0 ? "regulatory" :
    data && data.poi && data.poi.length > 0 ? "poi" : 
    "dd"
  )

  const { state, dispatch } = useToggle();
  const toggle = (id: string) => {
    dispatch({ type: 'TOGGLE', id });
  }

  const regulatoryData = useMemo(() => {
    if (!data || !data.regulatory || data.regulatory.length === 0) {
      return [];
    }
    return data.regulatory;
  }, [data]);

  const poiData = useMemo(() => {
    if (!data || !data.poi || data.poi.length === 0) {
      return [];
    }
    return data.poi;
  }, [data]);

  const ddData = useMemo(() => {
    if (!data || !data.dd || data.dd.length === 0) {
      return [];
    }
    return data.dd;
  }, [data]);

  const getTitleFromDataset = useTitleFromDataset();


  const createEvents = (dataItem: OTHER_DATASET_REL) => {
    const eventTypes = dataItem.EVENT_TYPE ?  dataItem.EVENT_TYPE.split(",") : "";
    const eventDate = dataItem.EVENT_DATE ? dataItem.EVENT_DATE.slice(1,-1).split(",") : "";
    const eventEvidenceIds =dataItem.EVENT_EVIDENCEID ? JSON.parse(dataItem.EVENT_EVIDENCEID.replace(/\b(\w+)\b/g, '"$1"')) : "";
    const eventCurrencyCode = dataItem.EVENT_CURRENCYCODE ? dataItem.EVENT_CURRENCYCODE.slice(1,-1).split(",") : "";
    const eventAmount = dataItem.EVENT_AMOUNT ? dataItem.EVENT_AMOUNT.slice(1,-1).split(",") : "";
  
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
        eventCurrencyCode: eventCurrencyCode[i] || "",
        eventAmount: eventAmount[i] || "",
        evidences: relatedEvidences || [],
      });
    }
    return events;
  };
  const otherData = useMemo(() => {
    if (!data) {
      return [];
    }

    if (datasetType === "regulatory") {
      return regulatoryData.map((dataItem: OTHER_DATASET_REL) => ({
        ...dataItem,
        events: createEvents(dataItem),
      }));
    } else if (datasetType === "poi") {
      return poiData.map((dataItem: OTHER_DATASET_POI) => {
        const EVIDENCEIDArray = dataItem.EVIDENCEIDS 
        ? dataItem.EVIDENCEIDS.split(",")
        : [];        
        let relatedEvidences = evidenceData.filter((evidence: Evidence) => 
        evidence.EVIDENCEID &&  EVIDENCEIDArray.includes(evidence.EVIDENCEID));
        
        relatedEvidences = relatedEvidences.sort((a, b) => {
          if(a.CAP_DATE === null || a.CAP_DATE === "Unknown") return 1;
          if(b.CAP_DATE === null || b.CAP_DATE === "Unknown") return -1;

          return new Date(b.CAP_DATE).getTime() - new Date(a.CAP_DATE).getTime();
      });
        
        return {...dataItem, evidences: relatedEvidences}
      });
    } else if (datasetType === "dd") {
      return ddData.map((dataItem: OTHER_DATASET_DD) => {
        const EVIDENCEIDArray = dataItem.EVIDENCEIDS 
        ? dataItem.EVIDENCEIDS.split(",")
        : [];
        let relatedEvidences = evidenceData.filter((evidence: Evidence) => 
        evidence.EVIDENCEID &&   EVIDENCEIDArray.includes(evidence.EVIDENCEID));
       
        relatedEvidences = relatedEvidences.sort((a, b) => {
          if(a.CAP_DATE === null || a.CAP_DATE === "Unknown") return 1;
          if(b.CAP_DATE === null || b.CAP_DATE === "Unknown") return -1;

          return new Date(b.CAP_DATE).getTime() - new Date(a.CAP_DATE).getTime();
      });
       
        return {...dataItem, evidences: relatedEvidences}
      });
    } else {
      return [];
    }
  }, [data, datasetType]);

  return (
    <main className="max-w-1320 mx-auto py-8 rounded-20 bg-white my-5 text-[#111111]">
      <section className="flex gap-2.5 mb-10  overflow-scroll scrollbar-hide">
      <div className={'flex '}>
     {regulatoryData.length>0 && <article onClick={()=>setDatasetType("regulatory")} className={`ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900 ${datasetType ==="regulatory" && "bg-gray-900 text-white " } w-fit`}>
        Regulatory Enforcement List ({regulatoryData.length})
      </article> }
     {poiData.length>0 && <article onClick={()=>setDatasetType("poi")} className={`ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900 ${datasetType ==="poi" && "bg-gray-900 text-white " } w-fit`}>
      Profile of Intest ({poiData.length})
      </article> }
      {ddData.length>0 && <article onClick={()=>setDatasetType("dd")} className={`ml-8 py-2 px-3 border border-solid rounded-20 font-bold cursor-pointer border-gray-900 ${datasetType ==="dd" && "bg-gray-900 text-white " } w-fit`}>
      Disqualified Director ({ddData.length})
      </article>}
      </div>
      </section>

      {datasetType === "regulatory" ? otherData.map(({events, WE_CD,CATEGORY,EVENT_TYPE,SUB_CATEGORY,EVENT_DATE,EVENT_EVIDENCE_ID}:any, i:number) => (
        <div
          key={i}
          className={`pb-6 
          ${i !== otherData.length - 1 && "border-b-[5px] border-gray-100"}`}
        >
         
            <div key={i}>
              <section className="mt-10 px-8">
                <h1 className="text-xl mb-2">{CATEGORY}</h1>
                <p className="text-gray-700">{SUB_CATEGORY}</p>
              </section>
              <section className="pt-7 px-8 ">
                <article
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                  onClick={() => toggle(`otherEventOpen${WE_CD}${i}`)}
                >
                  <h6 className="text-gray-500">{EVENT_TYPE.split(",").length}{" "} Event</h6>
                  <Image
                    src={arrow}
                    alt=""
                    className={`${!state[`otherEventOpen${WE_CD}${i}`] && "rotate-180"}`}
                  />
                </article>
                <ul>
                  <li className={`${i !== EVENT_TYPE.split(",").length - 1 && "pb-8"}`}>
                    {state[`otherEventOpen${WE_CD}${i}`] &&
                      events.map(
                        (
                          { type,evidences, date,evidenceId,eventAmount,eventCurrencyCode }:{type:string, evidences:Evidence[], date:string, evidenceId:string, eventAmount:string, eventCurrencyCode:string},
                          k:number
                        ) => (
                          <article
                            key={k}
                            className={`py-6 px-8 bg-gray-50 border-y border-gray-200 
                        ${i !== events.length - 1 && "mb-4"}`}
                          >
                            <div className={'flex font-semibold'}>
                              {type}{" "}{eventCurrencyCode}{" "}{eventAmount}
                            </div>
                            {date && <div className={'flex'}>
                              {date}
                            </div>}
                            <div
                              className="flex items-center gap-2 mb-2.5 cursor-pointer"
                              onClick={() => toggle(`otherEvidenceOpen${type}${i}${k}`)}
                            >
                            {evidenceId &&  <p className="font-bold text-gray-500 text-md">{evidenceId.length}{" "}{"Evidence"}</p>}
                              <Image
                                src={bigArrow}
                                alt=""
                                className={`${
                                  !state[`otherEvidenceOpen${type}${i}${k}`] && "rotate-180"
                                }`}
                              />
                            </div>
                            {state[`otherEvidenceOpen${type}${i}${k}`] && evidences &&
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
                              onClick={() => toggle(`otherEvidenceDetailOpen${type}${i}${j}`)
                              }
                            >
                              <p className="font-bold text-lg">{TITLE ? EVIDENCEID + " : " + TITLE : EVIDENCEID}</p>
                              <Image
                                src={bigArrow}
                                alt=""
                                className={`${
                                  !state[`otherEvidenceDetailOpen${type}${i}${j}`] && "rotate-180"
                                }`}
                              />
                            </div>
                            {state[`otherEvidenceDetailOpen${type}${i}${j}`] && (
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
              </section>

            </div>
          
        </div>
      )) : datasetType ==="poi" ? otherData.map(({evidences,WE_CD,CATEGORY,DATE_ELECTION,DATE_FROM,DATE_TO,EVIDENCEIDS,POSITION,SEGMENT,COUNTRYISOCODE,COUNTRYNAME }: any, i:number) => (
        <div
          key={i}
          className={`pb-6 
          ${i !== otherData.length - 1 && "border-b-[5px] border-gray-100"}`}
        >
          <section className="mt-10 pb-6 border-b border-gray-100 px-8">
            <h1 className="text-xl mb-2">
            {CATEGORY}
            </h1>
          </section>

        {evidences && evidences.length > 0 && <section className="pt-7 px-8 border-t border-gray-100">
            <article
              className="flex items-center gap-2 mb-[14px] cursor-pointer"
              onClick={() => toggle(`poiEvidenceOpen${WE_CD}${i}`)}
            >
              <h1 className="text-xl">{evidences.length} Evidence</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!state[`poiEvidenceOpen${WE_CD}${i}`] && "rotate-180"}`}
              />
            </article>
   {state[`poiEvidenceOpen${WE_CD}${i}`] && evidences &&
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
                                  onClick={() => toggle(`poiEvidenceDetailOpen${WE_CD}${i}`)
                                  }
                                >
                                  <p className="font-bold text-lg">{TITLE ? EVIDENCEID + " : " + TITLE : EVIDENCEID}</p>
                                  <Image
                                    src={bigArrow}
                                    alt=""
                                    className={`${
                                      !state[`poiEvidenceDetailOpen${WE_CD}${i}`] && "rotate-180"
                                    }`}
                                  />
                                </div>
                                {state[`poiEvidenceDetailOpen${WE_CD}${i}`] && (
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
        {POSITION && POSITION.split(',').length > 0 && <section className="pt-7 px-8 border-t border-gray-100">
            <article
              className="flex items-center gap-2 mb-[14px] cursor-pointer"
              onClick={() => toggle(`poiPositionOpen${WE_CD}${i}`)}
            >
              <h1 className="text-xl">{POSITION.split(',').length} Position</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!state[`poiPositionOpen${WE_CD}${i}`] && "rotate-180"}`}
              />
            </article>
   {state[`poiPositionOpen${WE_CD}${i}`] && POSITION &&
                        POSITION.split(',').map(
                            (position:string, i:number) => (
                              <article
                                key={i}
                                className={`py-6 px-8 bg-gray-50 border-y border-gray-200 
                            ${i !== POSITION.split(',').length - 1 && "mb-4"}`}
                              >
                                <div
                                  className="flex items-center justify-between gap-2 mb-2.5 "
                                  onClick={() => toggle(`poiPositionDetailOpen${WE_CD}${i}`)
                                  }
                                >
                                  <p className="font-bold text-lg">{position}</p>
                                
                                </div>
                                <div
                                  className="flex items-center justify-between gap-2 mb-2.5 "
                        
                                >
                                  <p className="font-medium text-lg">{SEGMENT.slice(1,-1).split(',')[i] ? SEGMENT.slice(1,-1).split(',')[i] : ""}{ COUNTRYNAME && COUNTRYNAME?.slice(1,-1).split(',')[i] ? " in " + COUNTRYNAME.slice(1,-1).split(',')[i] : ""}</p>
                                
                                </div>
                             {(DATE_FROM.slice(1,-1).split(',') ||DATE_TO.slice(1,-1).split(','))  && 
                               <div
                                  className="flex items-center justify-between gap-2 mb-2.5 "
                        
                                >
                                  <p className="font-medium text-lg">{DATE_FROM.slice(1,-1).split(',')[i] && DATE_FROM.slice(1,-1).split(',')[i]!=" " ? DATE_FROM.slice(1,-1).split(',')[i] : "Unknown"}{DATE_TO.slice(1,-1).split(',')[i] && DATE_TO.slice(1,-1).split(',')[i]!=" "    ? " to " + DATE_TO.slice(1,-1).split(',')[i] : " to Unknown"}</p>
                                
                                </div>}
                               
                          </article>
                        )
                      )}
          </section>}
        </div>
      )) : datasetType ==="dd" ? otherData.map(({evidences,WE_CD, CASE_REF, CONDUCT, DATE_FROM, DATE_TO,REASON,EVIDENCEIDS }: any, i:number) => (
        <div
          key={i}
          className={`pb-6 
          ${i !== otherData.length - 1 && "border-b-[5px] border-gray-100"}`}
        >
          <section className="mt-10 pb-6 border-b border-gray-100 px-8">
            <h1 className="text-xl mb-2">
            {CASE_REF}
            </h1>
            <p className="text-gray-700">
                {CONDUCT}
            </p>
            <p className="text-gray-700">
              {REASON}
            </p>
            <p className="text-gray-700">
               {"Disqualified from "} {DATE_FROM ? DATE_FROM : "Unknown"}{" to "}{DATE_TO ? DATE_TO : "Unknown"}
            </p>
          </section>

        {EVIDENCEIDS &&  <section className="pt-7 px-8 border-t border-gray-100">
            <article
              className="flex items-center gap-2 mb-[14px] cursor-pointer"
              onClick={() => toggle(`otherDdOpen${WE_CD}${i}`)}
            >
              <h1 className="text-xl">{EVIDENCEIDS.split(",").length} Evidence</h1>
              <Image
                src={arrow}
                alt=""
                className={`${!state[`otherDdOpen${WE_CD}${i}`] && "rotate-180"}`}
              />
            </article>
   {state[`otherDdOpen${WE_CD}${i}`] && evidences &&
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
                                  onClick={() => toggle(`otherDdDetailOpen${WE_CD}${i}`)
                                  }
                                >
                                  <p className="font-bold text-lg">{TITLE ? EVIDENCEID + " : " + TITLE : EVIDENCEID}</p>
                                  <Image
                                    src={bigArrow}
                                    alt=""
                                    className={`${
                                      !state[`otherDdDetailOpen${WE_CD}${i}`] && "rotate-180"
                                    }`}
                                  />
                                </div>
                                {state[`otherDdDetailOpen${WE_CD}${i}`] && (
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
      )) : ""}
    </main>
  );
};

export default Others;
