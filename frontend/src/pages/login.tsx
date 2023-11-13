import React, { useState,Dispatch, SetStateAction,useRef,useMemo } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import logo from 'assets/icons/header/amlLogo.png'
import Image from 'next/image';
import { useEmail,State,Action } from 'contexts/UserContext';
import Link from 'next/link';
import {dashboard, status} from 'interfaces/dashboard';


const LoginPage =({setIsLogin,dashboardData,statusData,newsData, linkData}:{setIsLogin:Dispatch<SetStateAction<boolean>>; dashboardData:dashboard[]; statusData:status[]; newsData:status[]; linkData:any;}) => {
  const [type, setType] = useState("status")

  const [isLoading,setIsLoading]=useState(false);
  const {state,dispatch} :{state:State,dispatch:React.Dispatch<Action>}=useEmail();
  const [message, setMessage] = useState('');
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const currentDate = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Month starts from 0 to 11, hence adding 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}, []);
  const totalList= dashboardData.filter((data:dashboard)=>data.component === "TOTAL_LIST") || ""
  const sanctionList= dashboardData.filter((data:dashboard)=>data.component === "SANCTION_LIST") || ""
  const pepList= dashboardData.filter((data:dashboard)=>data.component === "PEP_LIST") || ""
  const rcaList= dashboardData.filter((data:dashboard)=>data.component === "RCA_LIST") || ""
  const poiList= dashboardData.filter((data:dashboard)=>data.component === "FORMER_PEP") || ""
  const countryList= dashboardData.filter((data:dashboard)=>data.component === "COUNTRY_RISK") || ""
  const kofiuList= dashboardData.filter((data:dashboard)=>data.component === "KOFIU") || ""
  const unList= dashboardData.filter((data:dashboard)=>data.component === "UN") || ""
  const euList= dashboardData.filter((data:dashboard)=>data.component === "EU") || ""
  const ofacNonSdnList= dashboardData.filter((data:dashboard)=>data.component === "OFAC_NON_SDN") || ""
  const ofacSdnList= dashboardData.filter((data:dashboard)=>data.component === "OFAC_SDN") || ""
  const ofacList= dashboardData.filter((data:dashboard)=>data.component === "OFAC") || ""
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = userEmail.current?.value || '';
    const password = userPassword.current?.value || '';
    setIsLoading(true)
  
    try {
      const response = await axios.post('http://localhost:7878/api/login', {
        username,
        password,
      }, { 
        withCredentials: true, 
      });
  
      if (response.status === 200) {
        setIsLogin(true);
        dispatch({type:"SET_EMAIL",email:username as string})
        router.push("/");
        setMessage('');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error();
      }
    } catch (error) {
      console.log('login error', error)
      setIsLoading(false)
      setMessage('Invalid username or password!');
    }
  };
  return (
    
<main className="min-w-[1280px] max-w-[1280px]  min-h-screen container mx-auto pt-20">
<div className="flex items-center justify-center mx-auto  ">
        <h2 className="text-4xl leading-[140%] font-extrabold text-black mobile:text-[20px]">
          금융 제재 리스트의 새로운 패러다임
        </h2>

      </div>
<div className="py-12 px-8 space-y-3">
    <div className='flex justify-start text-lg'>
        <div className='flex space-x-3 w-full h-full justify-center items-center'>
            <div className=" bg-white p-5 rounded-2xl shadow-xl w-1/3" style={{boxSizing: 'border-box'}}>
      <div className={'flex items-center justify-center'}>
        <Image src={logo} quality={100} width={135} height={36} alt="logo"/>
      </div>
      {isLoading ?    <div role="status" className={'py-20 flex justify-center items-center'} >
      <svg aria-hidden="true" className="w-12 h-12  text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
  </div> :
  <div>
  <form className="mt-5 space-y-6" onSubmit={handleLogin}>
      
            <div className=" shadow-sm space-y-2 py-1.5">
              <div>
                <label htmlFor="email-address" className="sr-only">Username</label>
                <input 
                  id="username" 
                  name="username" 
                  type="text" 
                  required 
                  className="bg-[#F2F4F8] rounded-xl appearance-none  relative block w-full px-3 py-3 placeholder-gray-400 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm"
                  placeholder="Username" 
                  ref={userEmail}
                />
              </div>
              <div className=''>
                <label htmlFor="password" className="sr-only">Password</label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  className="bg-[#F2F4F8] appearance-none  relative block w-full px-3 py-3 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm"
                  placeholder="Password"
                  ref={userPassword}
                  />
                </div>
              </div>

              <div className='pb-2'>
                <button type="submit" className=" group relative  w-full h-[48px] items-center flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-xl text-white bg-[#0F62FE] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Login
                </button>
              </div>
      
            </form>
                    <p className="text-center text-xs text-[#DA1E28]">
                    {message}
                  </p>
                  </div>
            }
      
            {/* <div className="mt-6 text-center text-xs text-gray-600">
              로그인 이후에 추가적인 정보를 이용하실 수 있습니다. 
              <br/>
              기존 회원이 아니신 분은 담당자에게 문의해 주시길 바랍니다.<br/>
              <br/>
              
              <p className={'text-blue-400'}>(문의) 070-4603-2369</p>
          </div> */}
</div>

<div className='flex flex-wrap space-y-3 '>
        <div className='flex space-x-3 w-full h-[138px]'>
            <div className='flex rounded-20 bg-[#0B1F55]  text-white p-10  items-center justify-between  shadow-lg w-1/2' style={{boxSizing: 'border-box'}}>
        <div className='flex flex-col items-center text-2xl '>
          <h2 className='font-bold '>Total Watch List</h2>
          <h3 className=''>{totalList && totalList[0].total_row ? totalList[0].total_row.toLocaleString('en-us') : 0}</h3>
        </div>
        <div
    className="inline-block  min-h-[1em] w-0.5 h-[48px]  bg-neutral-100 opacity-50 dark:opacity-50"></div>
        <div className='flex flex-col items-center mx-10'>
          <p className=' text-[#C1C7CD] text-sm my-1'>Change</p>
          <h3 className='text-2xl'>{totalList && totalList[0].changes ? totalList[0].changes.toLocaleString('en-us') : 0}</h3>
        </div>
      </div>

      <div className='w-1/2 flex rounded-20 bg-[#4A2849] text-white p-10  items-center justify-between shadow-lg' style={{boxSizing: 'border-box'}}>
        <div className='flex flex-col items-center text-2xl'>
          <h2>Sanction List</h2>
          <h3>{sanctionList && sanctionList[0].total_row ? sanctionList[0].total_row.toLocaleString('en-us') : 0}</h3>
        </div>
        <div
    className="inline-block  min-h-[1em] w-0.5 h-[48px]  bg-neutral-100 opacity-50 dark:opacity-50"></div>
        <div className='flex flex-col items-center mx-10'>
          <p className=' text-[#C1C7CD] text-sm my-1'>Change</p>
          <h3 className='text-2xl'>{sanctionList && sanctionList[0].changes ? sanctionList[0].changes.toLocaleString('en-us') : 0}</h3>
        </div>
      </div>
      </div>

      <div className='flex space-x-3 w-full  h-[138px]'>
            <div className='shadow-lg flex flex-col rounded-20 bg-[#5B0669] text-white p-5 w-1/4' style={{boxSizing: 'border-box'}}>
        <div className='flex space-y-1 justify-center flex-col'>
          <h3 className='text-xl'>PEP</h3>
          <p className="text-xs  text-[#878D96]">Politically Exposed Person</p>
        </div>

        <div className='w-full h-full flex justify-center items-center'>
        <div className='flex w-full justify-between  items-center'>
          <div className='flex items-center text-xl '>
            <h3>{pepList && pepList[0].total_row ? pepList[0].total_row.toLocaleString('en-us') : 0}</h3>
          </div>
          <div
    className="inline-block  min-h-[1em] w-0.5 h-[24px] mx-5 bg-neutral-100 opacity-50 dark:opacity-50"></div>
          <div className='flex flex-col items-center mr-5'>
            <p className=' text-[#C1C7CD] text-sm my-1'>Change</p>
            <h3 className='text-xl'>{pepList && pepList[0].changes ? pepList[0].changes.toLocaleString('en-us') : 0}</h3>
          </div>
        </div>
        </div>
      </div>

      <div className=' shadow-lg  w-1/4 flex  flex-col rounded-20 bg-[#1C3098] text-white p-5' style={{boxSizing: 'border-box'}}>
      <div className='flex space-y-1 justify-center flex-col'>
          <h3 className='text-xl'>RCA</h3>
          <p className="text-xs  text-[#878D96]">Related Close Associate</p>
        </div>

        <div className='w-full h-full flex justify-center items-center'>
        <div className='flex w-full  justify-between  items-center'>
          <div className='flex items-center text-xl'>
            <h3>{rcaList &&  rcaList[0].total_row ? rcaList[0].total_row.toLocaleString('en-us') : 0}</h3>
          </div>
          <div
    className="inline-block  min-h-[1em] w-0.5 h-[24px] mx-5 bg-neutral-100 opacity-50 dark:opacity-50"></div>
          <div className='flex flex-col items-center mr-5'>
            <p className=' text-[#C1C7CD] text-sm my-1'>Change</p>
            <h3 className='text-xl'>{rcaList && rcaList[0].changes ? rcaList[0].changes.toLocaleString('en-us') : 0}</h3>
          </div>
          </div>
        </div>
      </div>

      <div className=' shadow-lg  w-1/4 flex  flex-col rounded-20 bg-[#356795] text-white p-5' style={{boxSizing: 'border-box'}}>
      <div className='flex space-y-1 justify-center flex-col'>
          <h3 className='text-xl'>POI</h3>
          <p className="text-xs  text-[#878D96]">Profile of Interest</p>
        </div>

        <div className='w-full h-full flex justify-center items-center'>
        <div className='flex w-full  justify-between  items-center'>
          <div className='flex items-center text-xl'>
            <h3>{poiList &&  poiList[0].total_row ? poiList[0].total_row.toLocaleString('en-us') : 0}</h3>
          </div>
          <div
    className="inline-block  min-h-[1em] w-0.5 h-[24px] mx-5 bg-neutral-100 opacity-50 dark:opacity-50"></div>
          <div className='flex flex-col items-center mr-5'>
            <p className=' text-[#C1C7CD] text-sm my-1'>Change</p>
            <h3 className='text-xl'>{poiList && poiList[0].changes ? poiList[0].changes.toLocaleString('en-us') : 0}</h3>
          </div>
          </div>
        </div>
      </div>

      <div className='shadow-lg w-1/4 flex flex-col   rounded-20 bg-[#740D0D] text-white p-5' style={{boxSizing: 'border-box'}}>
      <div className='flex space-y-1 justify-center flex-col'>
          <h3 className='text-xl'>고위험국가</h3>
          <p className="text-xs  text-[#878D96] ">Enhanced Country Risk</p>
        </div>
  
  <div className='w-full h-full flex justify-center items-center'>
        <div className='flex w-full justify-between px-2  items-center space-x-2'>
          <div className='flex items-center space-x-3 text-xl'>
            <p className=''>위험</p>
            <h3>{countryList && countryList[0].person  ? countryList[0].person.toLocaleString('en-us') : 0}</h3>
          </div>
          <div
    className="inline-block  min-h-[1em] w-0.5 h-[24px]   bg-neutral-100 opacity-50 dark:opacity-50"></div>
          <div className='flex items-center space-x-3 text-xl'>
            <p className=''>주의</p>
            <h3>{countryList && countryList[0].entity ? countryList[0].entity.toLocaleString('en-us') : 0}</h3>
          </div>
        </div>
        </div>
      </div>
    </div>
</div>
</div>
      </div>
      <div className='flex  justify-start space-x-10 w-full '>
       

       <div className='flex   w-full h-full space-x-2 '>
             <div className='flex space-x-2 w-full h-full '>
                 <div className='flex  rounded-20 bg-white text-black p-5 justify-between shadow-lg w-1/3 '>
                   <div className='flex flex-col space-y-2'>
                  <div>
                   <p className='text-sm truncate font-semibold'>KOFIU</p>
                   <h3 className='text-lg'>{kofiuList && kofiuList[0].total_row ? kofiuList[0].total_row.toLocaleString('en-us') : 0}</h3>
                   </div>
                   <div>
                   <p className='text-xs text-[#878D96]'>Change</p>
                   <h3>{kofiuList && kofiuList[0].changes ? kofiuList[0].changes.toLocaleString('en-us') : 0}</h3>
                   </div>
                   </div>
 
          <div className='flex flex-col space-y-2  justify-center items-center'>         
             
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-1.5 rounded-full'>Person</p>
                  <p className='text-xs font-bold'>{kofiuList && kofiuList[0].person ? kofiuList[0].person.toLocaleString('en-us') : 0}</p>
                   </div>
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-2 rounded-full'>Entity</p>
                  <p className='text-xs font-bold'>{kofiuList && kofiuList[0].entity ? kofiuList[0].entity.toLocaleString('en-us') : 0}</p>
                   </div>
                   </div>
                 </div>
                 <div className='flex  rounded-20 bg-white text-black p-5 justify-between shadow-lg w-1/3 '>
                   <div className='flex flex-col space-y-2'>
                  <div>
                   <p className='text-sm truncate font-semibold'>UN</p>
                   <h3 className='text-lg'>{unList && unList[0].total_row ? unList[0].total_row.toLocaleString('en-us') : 0}</h3>
                   </div>
                   <div>
                   <p className='text-xs text-[#878D96]'>Change</p>
                   <h3>{unList && unList[0].changes ? unList[0].changes.toLocaleString('en-us') : 0}</h3>
                   </div>
                   </div>
 
          <div className='flex flex-col space-y-2  justify-center items-center'>         
               
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-1.5 rounded-full'>Person</p>
                  <p className='text-xs font-bold'>{unList && unList[0].person ? unList[0].person.toLocaleString('en-us') : 0}</p>
                   </div>
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-2 rounded-full'>Entity</p>
                  <p className='text-xs font-bold'>{unList && unList[0].entity ? unList[0].entity.toLocaleString('en-us') : 0}</p>
                   </div>
                   </div>
                 </div>               
                 
                 <div className='flex  rounded-20 bg-white text-black p-5 justify-between shadow-lg w-1/3 '>
                   <div className='flex flex-col space-y-2'>
                  <div>
                   <p className='text-sm truncate font-semibold'>EU</p>
                   <h3 className='text-lg'>{euList && euList[0].total_row ? euList[0].total_row.toLocaleString('en-us') : 0}</h3>
                   </div>
                   <div>
                   <p className='text-xs text-[#878D96]'>Change</p>
                   <h3>{euList && euList[0].changes ? euList[0].changes.toLocaleString('en-us') : 0}</h3>
                   </div>
                   </div>
 
          <div className='flex flex-col space-y-2  justify-center items-center'>         
               
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-1.5 rounded-full'>Person</p>
                  <p className='text-xs font-bold'>{euList && euList[0].person? euList[0].person.toLocaleString('en-us') : 0}</p>
                   </div>
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-2 rounded-full'>Entity</p>
                  <p className='text-xs font-bold'>{euList && euList[0].entity? euList[0].entity.toLocaleString('en-us') : 0}</p>
                   </div>
                   </div>
                 </div>            
                 </div>
 
             <div className='flex space-x-2 w-full h-full'>
             <div className='flex  rounded-20 bg-white text-black p-5 justify-between shadow-lg w-1/3 '>
                   <div className='flex flex-col space-y-2'>
                  <div>
                   <p className='text-sm truncate font-semibold'>OFAC</p>
                   <h3 className='text-lg'>{ofacList && ofacList[0].total_row ? ofacList[0].total_row.toLocaleString('en-us') : 0}</h3>
                   </div>
                   <div>
                   <p className='text-xs text-[#878D96]'>Change</p>
                   <h3>{ofacList && ofacList[0].changes ? ofacList[0].changes.toLocaleString('en-us') : 0}</h3>
                   </div>
                   </div>
 
          <div className='flex flex-col space-y-2  justify-center items-center'>         
 
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-1.5 rounded-full'>Person</p>
                  <p className='text-xs font-bold'>{ofacList && ofacList[0].person ? ofacList[0].person.toLocaleString('en-us') : 0}</p>
                   </div>
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-2 rounded-full'>Entity</p>
                  <p className='text-xs font-bold'>{ofacList && ofacList[0].entity ? ofacList[0].entity.toLocaleString('en-us') : 0}</p>
                   </div>
                   </div>
                 </div>               
                 
                 <div className='flex  rounded-20 bg-white text-black p-5 justify-between shadow-lg w-1/3 '>
                   <div className='flex flex-col space-y-2'>
                  <div>
                   <p className='text-sm truncate font-semibold'>OFAC SDN</p>
                   <h3 className='text-lg truncate'>{ofacSdnList && ofacSdnList[0].total_row ? ofacSdnList[0].total_row.toLocaleString('en-us') : 0}</h3>
                   </div>
                   <div>
                   <p className='text-xs text-[#878D96]'>Change</p>
                   <h3>{ofacSdnList && ofacSdnList[0].changes ? ofacSdnList[0].changes.toLocaleString('en-us') : 0}</h3>
                   </div>
                   </div>
 
          <div className='flex flex-col space-y-2  justify-center items-center'>         
 
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-1.5 rounded-full'>Person</p>
                  <p className='text-xs font-bold'>{ofacSdnList && ofacSdnList[0].person ? ofacSdnList[0].person.toLocaleString('en-us') : 0}</p>
                   </div>
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-2 rounded-full'>Entity</p>
                  <p className='text-xs font-bold'>{ofacSdnList && ofacSdnList[0].entity? ofacSdnList[0].entity.toLocaleString('en-us') : 0}</p>
                   </div>
                   </div>
                 </div>                
                 <div className='flex  rounded-20 bg-white text-black p-5 justify-center items-center shadow-lg w-1/3 '>
                   <div className='flex flex-col space-y-2'>
                  <div>
                   <p className='text-sm truncate font-semibold'>OFAC NON SDN</p>
                   <h3 className='text-lg'>{ofacNonSdnList && ofacNonSdnList[0].total_row ? ofacNonSdnList[0].total_row.toLocaleString('en-us') : 0}</h3>
                   </div>
                   <div>
                   <p className='text-xs text-[#878D96]'>Change</p>
                   <h3>{ofacNonSdnList && ofacNonSdnList[0].changes ? ofacNonSdnList[0].changes.toLocaleString('en-us') : 0}</h3>
                   </div>
                   </div>
 
          <div className='flex flex-col space-y-2  justify-center items-center'>         
 
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-1.5 rounded-full'>Person</p>
                  <p className='text-xs font-bold'>{ofacNonSdnList && ofacNonSdnList[0].person ? ofacNonSdnList[0].person.toLocaleString('en-us') : 0}</p>
                   </div>
                   <div className='flex space-x-2 justify-center items-center '>
                     <p className='text-xs text-[#878D96] bg-white py-0.5 px-2 rounded-full'>Entity</p>
                  <p className='text-xs font-bold'>{ofacNonSdnList && ofacNonSdnList[0].entity ? ofacNonSdnList[0].entity.toLocaleString('en-us') : 0}</p>
                   </div>
                   </div>
                 </div>            
                 </div>
                 
         </div>
 
 
         
     </div>
     <div className="flex w-full space-x-2 h-full">
     <div className='h-[360px] w-2/3  customScrollBar overflow-auto flex flex-col rounded-20 bg-white text-black p-4 space-y-4 shadow-lg'>
         <div className='text-2xl'>
             <h2>Main Sanctions Status</h2>
         </div>
         <div className="flex space-x-3 px-5  font-semibold justify-between text-lg ">
         <div className="flex flex-col cursor-pointer w-1/3 text-center">
           <div
             className={`${
               type === "status" ? "text-black " : "text-gray-400 "
             }`}
             onClick={() => setType("status")}
           >
             Sanction Updates
           </div>
           {type === "status" ? (
             <hr className={"border-b-[3px] border-b-black mt-1.5 rounded-xl"} />
           ): 
             
           <hr className={"border-b-[2px] border-b-gray-100 mt-1.5 rounded-xl"} />}
         </div>
 
         <div className="flex flex-col cursor-pointer w-1/3 text-center">
           <div
             className={`${
               type === "news" ? "text-black " : "text-gray-400 "
             }`}
             onClick={() => setType("news")}
           >
             News Curation
           </div>
           {type === "news" ? (
             <hr className={"border-b-[3px] border-b-black mt-1.5 rounded-xl"} />
             ): 
             
             <hr className={"border-b-[2px] border-b-gray-100 mt-1.5 rounded-xl"} />}
         </div>
         <div className="flex flex-col cursor-pointer w-1/3 text-center">
           <div
             className={`${
               type === "alert" ? "text-black " : "text-gray-400 "
             }`}
             onClick={() => setType("alert")}
           >
             공지사항
           </div>
           {type === "alert" ? (
             <hr className={"border-b-[3px] border-b-black mt-1.5 rounded-xl"} />
             ) : 
             
             <hr className={"border-b-[2px] border-b-gray-100 mt-1.5 rounded-xl"} />
           }
         </div>
       </div>
       <div className="overflow-y-auto slim-scroll ">
         {type==="status" ? statusData?.map((status:any,i:number)=>(
        <div key={i}>
        <ul  className='flex space-x-5 items-center justify-between '>
         <div className={'flex items-center space-x-3 py-1'}>
           <li>
             <p className='text-sm text-[#A2A9B0] w-[80px] truncate'>{status.DATE ? status.DATE : ""}</p>
           </li>
           <li>
             <Link target="_blank" href={`${status.URL_LINK ? status.URL_LINK : ""}`} className='truncate hover:text-[#4589FF] cursor-pointer flex items-center space-x-2'><p className="text-gray-400 font-semibold">{status.CLASS ? status.CLASS : ""}</p>{" "}<h3 className={'font-semibold inline'}>{status.TITLE ? status.TITLE : ""}</h3></Link>
             <p className='text-sm text-[#4D5358] truncate'>{status.SUB_TITLE ? status.SUB_TITLE : " "}</p>
           </li>
           </div>
           <div>      
         <li className={'cursor-pointer mx-5'}>
           <Link target="_blank" href={`${status.URL_LINK ? status.URL_LINK : ""}`}>
           <Image src={`${status.ATTACHMENT=='1' ?  '/images/download.svg' : '/images/link.svg'}`} alt="link" width={`${status.ATTACHMENT ?  24 : 24}`} height={`${status.ATTACHMENT ?  24 : 24}`}/>
           </Link>
           </li>
           </div>  
           
         </ul>
          <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-200"/> 
           </div>
         )) : 
         type==="news" ?
         
         newsData?.map((news:any,i:number)=>(
           <div key={i}>
   <ul  className='flex space-x-5 items-center justify-between'>
         <div className={'flex items-center space-x-3 py-2'}>
           <li>
             <p className='text-sm text-[#A2A9B0] w-[80px] truncate'>{news.DATE ? news.DATE : ""}</p>
           </li>
           <li>
             <Link target="_blank" href={`${news.URL_LINK ? news.URL_LINK : ""}`} className='truncate hover:text-[#4589FF] cursor-pointer flex items-center space-x-2'><p className="text-gray-400 font-semibold">{news.CLASS ? news.CLASS : ""}</p>{" "}<h3 className={'font-semibold inline w-[500px] truncate'} title={news.TITLE}>{news.TITLE ? news.TITLE : ""}</h3></Link>
             <p className='text-sm text-[#4D5358] truncate'>{news.SUB_TITLE ? news.SUB_TITLE : " "}</p>
           </li>
           </div>
           <div>      
         <li className={'cursor-pointer mx-3'}>
           <Link target="_blank" href={`${news.URL_LINK ? news.URL_LINK : ""}`}>
           <Image src={`${news.ATTACHMENT=='1' ?  '/images/download.svg' : '/images/link.svg'}`} alt="link" width={`${news.ATTACHMENT ?  24 : 24}`} height={`${news.ATTACHMENT ?  24 : 24}`}/>
           </Link>
           </li>
           </div>  
           
         </ul>
          <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-200"/> 
           </div>
         ))
          :""}
       
         </div>
       </div> 
       
       
         <div className='h-[360px] customScrollBar overflow-auto flex flex-col rounded-20 bg-white text-black p-4 space-y-3 shadow-lg w-1/3'>
         <div className='text-2xl font-bold'>
             <h2>Sanction Linker</h2>
         </div>
         <div className="grid grid-cols-3 gap-2">
         {linkData?.map((link:any,i:number)=>(
        <Link href={`${link.URL_LINK}`} target="_blank" className="rounded-xl bg-gray-100 text-center underline py-3 text-gray-500 w-full " key={i}>
         {link.NAME}
 
           </Link>
         ))}
       </div>
         </div>
         </div>
         
         
     <div className='mt-5'>
     <p className='text-sm text-[#878D96] '>{currentDate} 06:00 기준 (업데이트는 매일 06:00 에 진행합니다)</p>
     </div>
 </div>
     </main>
   );
 };
export default LoginPage;



export async function getServerSideProps(){
  const res= await fetch(`${process.env.SERVER_URL}/api/dashboard`);
  const dashboardData=await res.json();
  const res2= await fetch(`${process.env.SERVER_URL}/api/status`);
  let statusData=await res2?.json();
  const res3= await fetch(`${process.env.SERVER_URL}/api/news`);
  let newsData=await res3?.json();
  const res4= await fetch(`${process.env.SERVER_URL}/api/link`);
  let linkData=await res4?.json();
  statusData= statusData ? statusData.sort((a:any,b:any)=> b.NO - a.NO) : []
  newsData= newsData ? newsData.sort((a:any,b:any)=> b.NO - a.NO) : []
  return {
    props : {
      dashboardData,statusData,newsData,linkData
    }
  }
}