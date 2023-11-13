import Layout from "components/layouts/Layout";
import "styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { SearchProvider } from "contexts/SearchStateContext";
import { ToggleProvider } from "contexts/toggleContext";
import { UserProvider, useEmail } from "contexts/UserContext";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { safeLocalStorageGet } from "utils/safeLocalStorage";

function InnerApp({ Component, pageProps }: any) {
  const router = useRouter();
  const { state,dispatch } = useEmail(); 
  const [isLogin, setIsLogin] = useState(false);


  const checkAuthStatus = async () => {
    if (isLogin === false && (router.pathname === '/login')) {
      return;
    }

    try {
      const response = await axios.get('http://localhost:7878/api/validate', {
        withCredentials: true,
      });
      const emailFromStorage = safeLocalStorageGet('email');


      if (response.status === 200) {
        setIsLogin(true);
        if (emailFromStorage) {
          dispatch({ type: 'SET_EMAIL', email: emailFromStorage });
        }        
      } else {
        setIsLogin(false);
        dispatch({ type: 'RESET' }); 
        if(router.pathname !== '/contact') {
        router.push("/login")};
        
      }
    } catch (error) {
      setIsLogin(false);
      dispatch({ type: 'RESET' });
      if(router.pathname !== '/contact') {
      router.push("/login")};
         }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [router.pathname,isLogin]);

  if (!isLogin && (router.pathname !== "/login" && router.pathname !== "/contact")) {
    return null;
  }

  return (
    <Layout isLogin={isLogin} setIsLogin={setIsLogin} {...pageProps}>
      <Component  setIsLogin={setIsLogin} {...pageProps} />
    </Layout>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SearchProvider>
        <ToggleProvider>
          <InnerApp Component={Component} pageProps={pageProps} />
        </ToggleProvider>
      </SearchProvider>
    </UserProvider>
  );
}

App.getInitialProps = async ({ ctx }: AppContext) => {
  const userAgent = ctx.req
    ? ctx.req.headers["user-agent"]
    : navigator.userAgent;
  const isMobile = false;
  return { pageProps: { isMobile } };
};
