import { useState, MouseEvent } from "react";
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

const TopBarAML = ({isLogin,setIsLogin}:any) => {
  const router = useRouter();
  const [isUserOpenModal, setIsUserOpenModal] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);
  const userRef = useModalClose(isUserOpenModal,setIsUserOpenModal);

  const handleMainPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `/`;
  };

  
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:7878/api/logout', null, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        setIsLogin(false);
        window.location.href = "/login"; 
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <header className="bg-white h-16 min-w-[1280px]">
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
           <div
              className="flex items-center"
            //@ts-ignore
              ref={userRef}
              onClick={() => setIsUserOpenModal((prev) => !prev)}
            >
              <Image
                src={noProfile}
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
       :  (
          <div>
<button
    className="inline-flex items-center justify-center px-4 py-2 bg-white text-black border text-sm font-bold rounded-full hover:bg-black hover:text-white active:bg-gray-400 cursor-pointer transition-colors duration-200"
    onClick={() => router.push("/login")}
>
    Login
</button>
            </div>
          )}
      </div>
    </header>
  );
};

export default TopBarAML;
