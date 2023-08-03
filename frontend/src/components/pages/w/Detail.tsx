import { useState, useMemo } from "react";

import Top from "components/templates/amlDetail/Top";
import Core from "components/templates/amlDetail/Core";
import Associations from "components/templates/amlDetail/Associations";
import Sanctions from "components/templates/amlDetail/Sanctions";
import Risks from "components/templates/amlDetail/Risks";
import Others from "components/templates/amlDetail/Others";
import Evidence from "components/templates/amlDetail/Evidence";
import PepPositions from "components/templates/amlDetail/PepPositions";
import { ProfileDetail,ASSOCIATIONS,PEP_POSITIONS,SANCTIONS,REPUTATIONAL_RISK,OTHER_DATASET_DD,OTHER_DATASET_POI,OTHER_DATASET_REL,Evidence as EVIDENCE } from "interfaces/detail";
import { useToggle } from "contexts/toggleContext";


interface DataMapping {
  profileData: ProfileDetail[];
  associationData: ASSOCIATIONS[];
  pepPositionData: PEP_POSITIONS[];
  sanctionData: SANCTIONS[];
  riskData: REPUTATIONAL_RISK[];
  otherData: {
      regulatory: OTHER_DATASET_REL[];
      dd: OTHER_DATASET_DD[]; 
      poi: OTHER_DATASET_POI[];
  };
  evidenceData: EVIDENCE[];
}
type DataMappingKey = keyof DataMapping;
interface DetailMenu  {
  id: number;
  title: string;
  url: (amlId: string) => string;
  dataKey: DataMappingKey;
};

interface Props{
  profileData:ProfileDetail[];
  evidenceData:EVIDENCE[];
  associationData:ASSOCIATIONS[]; 
  sanctionData:SANCTIONS[]; 
  riskData:REPUTATIONAL_RISK[]; 
  pepPositionData:PEP_POSITIONS[];
  evidenceDataSet:string[];
  otherRelData:OTHER_DATASET_REL[];
  otherDdData:OTHER_DATASET_DD[]; 
  otherPoiData:OTHER_DATASET_POI[];
}

const Detail = ({evidenceDataSet,profileData,evidenceData,associationData,sanctionData,pepPositionData,riskData,otherRelData,otherPoiData,otherDdData}:Props) => {
  const otherData=useMemo(()=>{
    return {
      regulatory:otherRelData,
      dd:otherDdData,
      poi:otherPoiData
    }
  },[otherDdData,otherPoiData,otherRelData])
  
  
  
  const dataMapping :DataMapping = {
    profileData: profileData,
    associationData: associationData,
    pepPositionData: pepPositionData,
    sanctionData: sanctionData,
    riskData: riskData,
    otherData:otherData,
    evidenceData: evidenceData,
  };
  
  const DETAIL_MENUS: DetailMenu[] = [
    { id: 0, title: "Profile Details", url: (amlId:string) => `http://localhost:7878/api/profile/${amlId}`, dataKey: 'profileData' },
    { id: 1, title: "Associations", url: (amlId:string) => `http://localhost:7878/api/associations/${amlId}`, dataKey: 'associationData' }, 
    { id: 2, title: "PEP Positions", url: (amlId:string) => `http://localhost:7878/api/peppositions/${amlId}`, dataKey: 'pepPositionData' }, 
    { id: 3, title: "Sanctions", url: (amlId:string) => `http://localhost:7878/api/sanctions/${amlId}`, dataKey: 'sanctionData' },
    { id: 4, title: "Rep. Risks", url: (amlId:string) => `http://localhost:7878/api/risks/${amlId}`, dataKey: 'riskData' },
    { id: 5, title: "Other Datasets", url: (amlId:string) => `http://localhost:7878/api/others/${amlId}`, dataKey: 'otherData' }, 
    { id: 6, title: "Evidence", url: (amlId:string) => `http://localhost:7878/api/evidence/${amlId}`, dataKey: 'evidenceData' },
  ];
  
  const [menu, setMenu] = useState(0);

  const { dispatch } = useToggle();
  const collapseAll = () => {
    dispatch({ type: 'RESET' });
  }


  const data = dataMapping[DETAIL_MENUS[menu].dataKey as DataMappingKey];



  return (
    <div className="pt-5 px-5 min-w-[1280px]">
      <Top profileData={profileData[0]} />
      <section className="my-5 max-w-1320 mx-auto px-8 py-6 rounded-20 bg-white overflow-scroll scrollbar-hide">
        <article className="flex items-center text-xl gap-6 pr-6 justify-between">
        {DETAIL_MENUS.map(({ id, title, dataKey }) => (
   (dataKey==="otherData" ? dataMapping[dataKey].regulatory.length>0 ||
   dataMapping[dataKey].dd.length>0 ||
   dataMapping[dataKey].poi.length>0 
   : dataMapping[dataKey].length > 0) && (
      <h5
        key={id}
        onClick={() => setMenu(id)}
        className={`cursor-pointer min-w-fit
        ${
          menu === id
            ? "text-[#111111]"
            : "text-gray-300 hover:text-gray-400"
        }`}
      >
        {title}
      </h5>
    )
          ))}
          <div className="flex-1 text-right min-w-fit">
            <button onClick={collapseAll} className="text-[#0198FF] text-sm">
              Collapse All Details
            </button>
          </div>
        </article>
      </section>
      { !data  ?
      <div role="status" className={'py-20 flex justify-center items-center'} >
      <svg aria-hidden="true" className="w-12 h-12  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
  </div>:

        [
          <Core key="core" profileData={profileData[0]} />,
          <Associations key="associations" data={data as ASSOCIATIONS[]} setMenu={setMenu} />,
          <PepPositions key="peppositions" data={data as PEP_POSITIONS[]} evidenceData={evidenceData}/>,
          <Sanctions key="sanctions" data={data as SANCTIONS[]} evidenceData={evidenceData} />,
          <Risks key="risks" data={data as REPUTATIONAL_RISK[]} evidenceData={evidenceData} />,
          <Others key="others" data={data as {regulatory:OTHER_DATASET_REL[], poi:OTHER_DATASET_POI[], dd:OTHER_DATASET_DD[]}} evidenceData={evidenceData} />,
          <Evidence key="evidence" data={data as EVIDENCE[]} dataset={evidenceDataSet} />,
        ][menu]
      }
    </div>
  );
};
export default Detail;


