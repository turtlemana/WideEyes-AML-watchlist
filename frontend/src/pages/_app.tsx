import Layout from "components/layouts/Layout";
import "styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { SearchProvider } from "contexts/SearchStateContext";
import { ToggleProvider } from "contexts/toggleContext";
import { useRouter } from "next/router";
import axios from "axios";
import {useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
const router = useRouter();
const [isLogin, setIsLogin] = useState(false)
useEffect(() => {
  checkAuthStatus();
}, [router.pathname]);

const checkAuthStatus = async () => {
  if (router.pathname === '/login') {
    return;
  }
  try {
    const response = await axios.get('http://localhost:7878/api/validate', {
      withCredentials: true,
    });

    if (response.status === 200) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      router.push("/login"); 
    }
  } catch (error) {
    setIsLogin(false);
    router.push("/login"); 
  }
};

if (!isLogin && router.pathname !== "/login") {
  return null; 
}

  return (
    <SearchProvider>
      <ToggleProvider>
    <Layout isLogin={isLogin} setIsLogin={setIsLogin} {...pageProps}>
      <Component setIsLogin={setIsLogin}  {...pageProps} />
    </Layout>
    </ToggleProvider>
    </SearchProvider>
  );
}

App.getInitialProps = async ({ ctx }: AppContext) => {
  const userAgent = ctx.req
    ? ctx.req.headers["user-agent"]
    : navigator.userAgent;
  // const isMobile = userAgent?.indexOf("Mobi") !== -1;
  const isMobile =false
  return { pageProps: { isMobile } };
};