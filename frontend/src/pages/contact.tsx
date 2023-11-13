import Image from "next/image"
import Link from "next/link"

const ContactPage=()=>{

    return (
        <main className="min-w-[1280px] max-w-[1280px]  min-h-screen container mx-auto pt-20 ">

<div className="flex flex-col items-center justify-center mx-auto  space-y-10">
    <div className="space-y-10">
        <h2 className="text-3xl leading-[140%] font-extrabold text-black mobile:text-[20px]">
         서비스 관련 문의나 피드백이 있으시면
        <br/> 
        언제든지 연락주세요 
        </h2>

    <div className='space-y-4'>
   <p className='text-2xl '> Contact Info</p> 
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/email.svg" width={44} height={44} alt="email"/>
    <div className='flex flex-col'>
    <h3>이메일</h3>
    <p>daniel.lee@gne.ai</p>
    </div>
    </div>
   </div>
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/phone.svg" width={44} height={44} alt="email"/>
    <div className='flex flex-col'>
    <h3>전화번호</h3>
    <p>010-6369-4759</p>
    </div>
    </div>
   </div>
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/website.svg" width={44} height={44} alt="email"/>
    <div className='flex flex-col'>
    <h3>웹사이트</h3>
    <Link href="https://gne.ai" target="_blank" className='hover:underline cursor-pointer'>https://gne.ai</Link>
    </div>
    </div>
   </div>
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/address.svg" width={44} height={44} alt="email"/>
    <div className='flex flex-col'>
    <h3>주소</h3>
    <p>(04516) 서울특별시 중구 서소문로 89-15, 7층</p>
    </div>
    </div>
   </div>
   <div className='w-[720px] h-[84px] bg-white rounded-xl p-5'>
    <div className='flex space-x-3'>
    <Image src="/images/administer.svg" width={44} height={44} alt="email"/>
    <div className='flex flex-col'>
    <h3>담당자</h3>
    <p>이창우</p>
    </div>
    </div>
   </div>
</div>  
</div>


</div>


</main>
    )
}


export default ContactPage