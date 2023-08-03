import { NextPage } from "next";
import WebComponent from "components/pages/w/BusinessDetail";
import MobileComponent from "components/pages/m/Detail";
import {GetServerSidePropsContext } from "next";
import { BusinessProfile} from "interfaces/detail";

interface Props {
  isMobile: boolean;
  profileData:BusinessProfile[];

}

const AMLDetail: NextPage<Props> = ({ isMobile,profileData}) => {
  return isMobile ? <MobileComponent /> : <WebComponent  profileData={profileData} />;
};

export default AMLDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`${process.env.SERVER_URL}/api/businessProfile/${context.query.amlId}`);


  const profileData = await res.json();


  return { props: { profileData } };
}