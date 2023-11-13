import { Dispatch,useState, MouseEvent, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "assets/icons/header/amlLogo.png";
import useModalClose from "utils/useModalClose";
import UserModal from "components/layouts/TopBar/UserModal";
import Contact from "components/templates/Contact";
import noProfile from 'assets/icons/main/noProfile.svg'
import { useRouter } from "next/router";
import axios from 'axios';
import Head from "next/head";
import {useEmail, State, Action} from 'contexts/UserContext';

const TopBarAML = ({isLogin,setIsLogin}:{isLogin:boolean; setIsLogin:Dispatch<SetStateAction<boolean>>}) => {
  const {state,dispatch} :{state:State,dispatch:React.Dispatch<Action>}=useEmail();

  const router = useRouter();
  const [isUserOpenModal, setIsUserOpenModal] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);
  const userRef = useModalClose(isUserOpenModal,setIsUserOpenModal);
  const handleMainPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `/`;
  };
  console.log(state.email)
  
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:7878/api/logout', null, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        setIsLogin(false);
        dispatch({type:"RESET"})
        window.location.href = "/login"; 
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <header className="bg-white h-16 min-w-[1280px] shadow-sm">
          <Head>
    <link rel="Icon" href="/favicon.png" type="image/x-icon" />
    <title>Wide Eyes</title>
    <meta property="og:image" content="https://wideeyes.co.kr/favicon.png" />
      <meta property="og:description" content={"Wide Eyes"} />
      <meta property="og:title" content="Wide Eyes" />
    </Head>
      <div className="min-w-[1280px] max-w-1320 h-full mx-auto flex items-center justify-between w-full desktop:max-w-5xl desktop:px-3 laptop:max-w-3xl laptop:px-3">
          
          <Link href="/" onClick={handleMainPage}>
            <Image
              src={logo}
              alt="logo"
              className="mr-10 cursor-pointer w-[205px] desktop:mr-5 "
            />
          </Link>
          {isLogin ?
          <div className={`flex items-center space-x-10 `}>
                        <Link href="/" className={`font-bold ${router.asPath==="/" ? "text-black " : "text-[#878D96] hover:text-gray-600 "}`}>Search</Link>
                        <Link href="/dashboard"  className={`font-bold ${router.asPath==="/dashboard" ? "text-black " : "text-[#878D96] hover:text-gray-600 "}`}>Dashboard</Link>
                        <Link href="/contact"  className={`font-bold ${router.asPath==="/contact" ? "text-black " : "text-[#878D96] hover:text-gray-600"}`}>Contact Us</Link>
 
           <div
              className="flex items-center"
            //@ts-ignore
              ref={userRef}
              onClick={() => setIsUserOpenModal((prev) => !prev)}
            >              <Image
                src={'/images/profile.svg'}
                width={30}
                height={30}
                alt="profile"
                className="mr-6 w-8 h-8 rounded-full cursor-pointer laptop:mr-3"
              />
              {isUserOpenModal && (
                <UserModal
                  onClose={() => setIsUserOpenModal((prev) => !prev)}
                  onLogout={handleLogout}
                  onOpenContactModal={() => setIsOpenContactModal(true)}
                />
              )}
              {isOpenContactModal && (
                <Contact onClose={() => setIsOpenContactModal(false)} />
              )}
            </div>
            </div>
       :  (
          <div className='flex space-x-5 mx-10'>
<button
    className={` inline-flex items-center justify-center px-4 py-2 bg-white ${router.asPath ==="/login" ? "text-black " : "text-[#878D96] hover:text-gray-600 "}   text-md font-bold rounded-full  active:bg-white cursor-pointer transition-colors duration-200`}
    onClick={() => router.push("/login")}
>
    Login
</button>
<button
    className={`inline-flex items-center justify-center px-4  py-2 bg-white ${router.asPath ==="/contact" ? "text-black " : "text-[#878D96]  hover:text-gray-600 "} text-md font-bold rounded-full  active:bg-white cursor-pointer transition-colors duration-200`}
    onClick={() => router.push("/contact")}
>
    Contact Us
</button>
            </div>
          )}
      </div>
    </header>
  );
};

export default TopBarAML;
