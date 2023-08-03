import { NextPage } from "next";
import WebComponent from "components/pages/w/Detail";
import MobileComponent from "components/pages/m/Detail";
import {GetServerSidePropsContext } from "next";
import { ProfileDetail,SANCTIONS,PEP_POSITIONS,REPUTATIONAL_RISK,ASSOCIATIONS,OTHER_DATASET_DD,OTHER_DATASET_POI,OTHER_DATASET_REL,Evidence } from "interfaces/detail";

interface Props {
  isMobile: boolean;
  profileData:ProfileDetail[];
  sanctionData:SANCTIONS[];
  pepPositionData:PEP_POSITIONS[];
  riskData:REPUTATIONAL_RISK[]; 
  associationData:ASSOCIATIONS[];
  evidenceData:Evidence[];
  otherRelData:OTHER_DATASET_REL[];
  otherDdData:OTHER_DATASET_DD[];
  otherPoiData:OTHER_DATASET_POI[];
  evidenceDataSet:string[];
}

const AMLDetail: NextPage<Props> = ({evidenceDataSet,sanctionData,pepPositionData,riskData,associationData, isMobile,profileData,evidenceData,otherRelData,otherDdData,otherPoiData }) => {
  return isMobile ? <MobileComponent /> : <WebComponent evidenceDataSet={evidenceDataSet} associationData={associationData} pepPositionData={pepPositionData} sanctionData={sanctionData} riskData={riskData} evidenceData={evidenceData} profileData={profileData} otherRelData={otherRelData} otherDdData={otherDdData} otherPoiData={otherPoiData}/>;
};

export default AMLDetail;


export async function getServerSideProps(context:GetServerSidePropsContext) {
  const res = await fetch(`${process.env.SERVER_URL}/api/profile/${context.query.amlId}`);
  const res2 = await fetch(`${process.env.SERVER_URL}/api/evidence/${context.query.amlId}`);
  const res3 = await fetch(`${process.env.SERVER_URL}/api/associations/${context.query.amlId}`);
  const res4 = await fetch(`${process.env.SERVER_URL}/api/peppositions/${context.query.amlId}`);
  const res5 = await fetch(`${process.env.SERVER_URL}/api/sanctions/${context.query.amlId}`);
  const res6 = await fetch(`${process.env.SERVER_URL}/api/risks/${context.query.amlId}`);
  const res7 = await fetch(`${process.env.SERVER_URL}/api/otherrel/${context.query.amlId}`);
  const res8 = await fetch(`${process.env.SERVER_URL}/api/otherdd/${context.query.amlId}`);
  const res9 = await fetch(`${process.env.SERVER_URL}/api/otherpoi/${context.query.amlId}`);
 
  const profileData = await res.json();
  const evidenceData = await res2.json();
  const associationData = await res3.json();
  const pepPositionData = await res4.json();
  const sanctionData = await res5.json(); 
  const riskData= await res6.json(); 
  const otherRelData = await res7.json();
  const otherDdData = await res8.json();
  const otherPoiData = await res9.json();
  
  let evidenceDataSet:string[]=[]

  if (evidenceData){
  const evidenceDataset = evidenceData.map((data:Evidence)=>data.DATASET)
  let flattenedData = evidenceDataset.flatMap((item:string) => item.split(','));

  evidenceDataSet = Array.from(new Set(flattenedData));
  evidenceDataSet.unshift("All")
  }

  return { props: {evidenceDataSet,profileData,evidenceData,associationData,pepPositionData,sanctionData,riskData,otherRelData,otherDdData,otherPoiData} }

      
}

  