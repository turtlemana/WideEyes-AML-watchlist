import React from "react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";


interface ErrorProps {
  statusCode?: number | null;
}

const ErrorPage = ({
  statusCode,
  isMobile,
}: {
  statusCode: NextPage<ErrorProps>;
  isMobile: boolean;
}) => {
  const router = useRouter();

  const getErrorMessage = (): string => {
    if (statusCode) {
      return `서버 에러가 발생했습니다. 에러 코드: ${statusCode}`
       
    }
    return "존재하지 않는 페이지입니다."

  };

  return (
    <main className="min-w-[1280px] flex flex-col justify-center min-h-screen pt-[72px] pb-[72px] bg-gradient-to-r from-[#ECF0F1] to-[#FFFFFF] text-center shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
      <h1 className="text-4xl text-[#111111] font-semibold mb-7 tracking-wide">
        Error
      </h1>
      <p className="text-gray-600 text-lg mb-5 font-light">
        {getErrorMessage()}
      </p>
      <div className={"flex justify-center items-center mb-5 space-x-3"}>
        {/* <Image
          src={"/images/character/CoinCharacter.png"}
          alt=""
          width={200}
          height={150}
          quality={100}
          className={""}
        /> */}
                <button onClick={()=>router.push('/')} className=" group w-[11.5rem]  h-[48px] items-center flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-xl text-white bg-[#0F62FE] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  홈으로 돌아가기
                </button>      
                <button onClick={()=>router.push('/contact')} className=" group w-[11.5rem]  h-[48px] items-center flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-xl text-[#0F62FE] bg-[#D0E2FF] hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  고객센터에 문의하기
                </button>      
                
                </div>
      <p className="text-gray-400 text-sm mt-5 italic">
        {
           "다시 시도해 보시거나 고객센터에 문의해주시길 바랍니다"
      }
      </p>
      <div className="mt-10 flex flex-col items-center justify-center mx-auto  space-y-10">
    <div className="space-y-10">
{/* 

    <div className='space-y-4'>
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/email.svg" width={44} height={44} alt="email"/>
    <div className='flex flex-col items-start'>
    <h3>이메일</h3>
    <p>daniel.lee@gne.ai</p>
    </div>
    </div>
   </div>
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/phone.svg" width={44} height={44} alt="phone"/>
    <div className='flex flex-col items-start'>
    <h3>전화번호</h3>
    <p>010-6369-4759</p>
    </div>
    </div>
   </div>
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/website.svg" width={44} height={44} alt="web"/>
    <div className='flex flex-col items-start'>
    <h3>웹사이트</h3>
    <Link href="https://gne.ai" target="_blank" className='hover:underline cursor-pointer'>https://gne.ai</Link>
    </div>
    </div>
   </div>
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/address.svg" width={44} height={44} alt="address"/>
    <div className='flex flex-col items-start'>
    <h3>주소</h3>
    <p>(04516) 서울특별시 중구 서소문로 89-15, 7층</p>
    </div>
    </div>
   </div>
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/administer.svg" width={44} height={44} alt="administrator"/>
    <div className='flex flex-col items-start'>
    <h3>담당자</h3>
    <p>이창우</p>
    </div>
    </div>
   </div>
</div>   */}
</div>


</div>
    </main>
  );
};

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default ErrorPage;
