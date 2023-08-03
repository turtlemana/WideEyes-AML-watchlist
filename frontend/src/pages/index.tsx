import { NextPage } from "next";
import WebComponent from "components/pages/w";
import MobileComponent from "components/pages/m";


interface Props {
  isMobile: boolean;
}

const AML: NextPage<Props> = ({ isMobile }) => {
  return isMobile ? <MobileComponent /> : <WebComponent />;
};

export default AML;

