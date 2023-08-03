import React, { useState,Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import logo from 'assets/icons/header/amlLogo.png'
import Image from 'next/image';

const LoginPage =({setIsLogin}:{setIsLogin:Dispatch<SetStateAction<boolean>>}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:7878/api/login', {
        username,
        password,
      }, { 
        withCredentials: true, 
      });
  
      if (response.status === 200) {
        setIsLogin(true);
        router.push("/");
        setMessage('Successfully logged in!');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log('login error', error)
      setMessage('Invalid username or password!');
    }
  };

  return (
    <div className="min-w-[1280px] min-h-screen flex flex-col justify-center bg-backgroundWideEyes bg-cover py-12 px-4 sm:px-6 lg:px-8 space-y-10">
    
    <div className="min-w-[1280px] container mx-auto flex flex-col items-center  space-y-20">
<div className="max-w-[1280px] mx-auto flex-1  ">
        <h2 className="text-[24px] leading-[140%] font-extrabold text-white mobile:text-[20px]">
          금융 제재 리스트의 새로운 패러다임
        </h2>
        <h3 className="my-[30px] mobile:w-[214px] mobile:mt-[20px] mobile:mb-[40px]">
          {/* <Image src={wideEyesText} alt="wide eyes" /> */}
        </h3>
        <p className="text-[18px] leading-[180%] text-white break-keep mobile:text-[16px]">
          가상자산 거래소부터 모든 금융 기관에게 {" "}
          <br className="hidden mobile:block" />
          AML이 더 이상 장애가 되지 않도록 돕습니다
          <br />
          신속함과 정확함이 만나는 곳, <br className="hidden mobile:block" />
          Wide Eyes와 함께 규제 준수를 <br className="hidden mobile:block" />
          더욱 효율적이고 안전하게 만들어보세요
        </p>
      </div>
      
      <div className="max-w-md mx-auto w-full space-y-18 bg-white p-10 rounded-xl shadow-md">
          <div className={'flex items-center justify-center'}>
              <Image src={logo} quality={100} width={200} height={100} alt="logo"/>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Username</label>
                <input 
                  id="username" 
                  name="username" 
                  type="text" 
                  required 
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Login
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              {message}
            </p>
            <div className="mt-6 text-center text-xs text-gray-600">
              로그인 이후에 추가적인 정보를 이용하실 수 있습니다. 
              <br/>
              기존 회원이 아니신 분은 담당자에게 문의해 주시길 바랍니다.<br/>
              <br/>
              
              <p className={'text-blue-400'}>(문의) 070-4603-2369</p>
          </div>
</div>
    
      </div>
    </div>
  );
};

export default LoginPage;
