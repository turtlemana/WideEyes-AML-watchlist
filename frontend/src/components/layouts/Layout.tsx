import { ReactNode,Dispatch,SetStateAction } from "react";
import TopBar from "components/layouts/TopBar";
import Footer from "components/layouts/Footer";
import MobileTopBar from "components/layouts/m/TopBar";
import MobileFooter from "components/layouts/m/Footer";

interface Props {
  isMobile: boolean;
  children?: ReactNode;
  isLogin :boolean;
  setIsLogin:Dispatch<SetStateAction<boolean>>
}

const Layout = ({ isMobile, children,isLogin,setIsLogin }: Props) => {
  const Top = isMobile ? <MobileTopBar /> : <TopBar isLogin={isLogin} setIsLogin={setIsLogin} />;
  const Bottom = isMobile ? <MobileFooter /> : <Footer />;
  return (
    <>
      {Top}
      <div className={isMobile ? "mt-16" : "min-h-screen"}>{children}</div>
      {/* {Bottom} */}
    </>
  );
};

export default Layout;
