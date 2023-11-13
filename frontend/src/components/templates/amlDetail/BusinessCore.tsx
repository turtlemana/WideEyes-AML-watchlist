import { BusinessProfile } from "interfaces/detail";
import Image from "next/image";

interface Props {
  profileData:BusinessProfile;
}

const BusinessCore = ({profileData}:Props) => {

  
 const {ADDRESS,CONTACT_KEY,CONTACT_VALUE,NATION_CODE,NAME,ALIAS,NATION_NAME
,NOTES,IDENTI_KEY,IDENTI_VALUE,IDENTI_DETAIL_KEY,IDENTI_DETAIL_VALUE,WE_CD,EU,OFAC_NON_SDN,UN,KOFIU,OFAC_SDN,VES_CALL,VES_FLAG,VES_GROSS,VES_OWNER,VES_TONNAGE,VES_TYPE} =profileData

let listed = {
    EU:EU,
    OFAC:OFAC_NON_SDN,
    UN:UN,
    KOFIU:KOFIU
}


let processAlias = (alias: string) => {
  if (alias === null || alias === "NULL" || alias === "") {
      return [];
  }
  let arrayAlias = alias.split(";");
  return arrayAlias.map((item: string) => item === 'NULL' ? '' : item);
}

let processField = (field: string | null) => {
  if (field === null || field === "NULL" || field === "") {
    return [];
  }
  return field.split(";").map((item: string) => item.trim() === 'NULL' ? '' : item.trim());
}
let processNote = (field: string | null) => {
  if (field === null || field === "NULL" || field === "") {
    return [];
  }
  return field.split(";").map((item: string) => item.trim() === 'NULL' ? '' : item.trim());
}


  let address:string[];
  if (ADDRESS === "NULL" || ADDRESS === "") {
      address = [];
  } else {
      let cleanedString = ADDRESS?.replace(/[\[\]"']/g, '');
      cleanedString = cleanedString?.replace(/^,+/, '');
      let parts = cleanedString?.split('/') ?? [];
      address=parts
      // let addressPart = parts.slice(0, -1).filter((part:string) => part !== '').join(' ');
      // let businessPart = parts[parts.length - 1];
      // address = [];
      // if (addressPart !== '') {
      //     address.push(addressPart);
      // }
      // if (businessPart !== '') {
      //     address.push(businessPart);
      // }
      // address = address.map((item: string) => item === 'NULL' ? '' : item);
      // console.log(address)
  }
  let alias=processAlias(ALIAS as string);
  let contactKey = processField(CONTACT_KEY as string);
  let contactValue = processField(CONTACT_VALUE as string);
  let identiKey=processField(IDENTI_KEY as string);
  let identiValue=processField(IDENTI_VALUE as string);
  let identiDetailKey=processField(IDENTI_DETAIL_KEY as string);
  let identiDetailValue=processField(IDENTI_DETAIL_VALUE as string);
  let notes = processNote(NOTES as string);

  identiKey= [...identiKey,...identiDetailKey]
  identiValue= [...identiValue,...identiDetailValue]

  
return (
    <main className="max-w-1320 mx-auto p-8 rounded-20 bg-white my-7 text-[#111111]">
      <section className="mb-10">
        <h1 className="text-xl mb-[14px]">Core Details</h1>
        <ul>
          {/* {CORE_DATA.map(({ id, title, content }, i) => (
            <li
              key={id}
              className={`flex gap-5 py-[14px] ${
                i !== CORE_DATA.length - 1 && "border-b border-gray-100"
              }`}
            >
              <p className="w-[160px] text-gray-400">{title}</p>
              <h6>{content}</h6>
            </li>
          ))} */}
        {NAME &&    <li
              className={`flex gap-5 py-[14px] 
                 "border-b border-gray-100"
              `}
            >
              <p className="w-[160px] text-gray-400">Name</p>
              <h6>{NAME}</h6>
            </li> }

        </ul>
      </section>
     {alias.length>0 && <section className="mb-10">
        <h1 className="text-xl mb-[14px]">Aliases</h1>
        <ul>
          {alias.map((name:string, i:number) => (
            <li
              key={i}
              className={`py-[14px] 
            ${i !== alias.length  && "border-b border-gray-100"}`}
            >
              <p>{name}</p>
            </li>
          )) }
        </ul>
      </section>}
     {NATION_CODE && <section className="mb-10">
       <h1 className="text-xl mb-7">Nationalities</h1>
       <div className={'flex flex-row gap-3'}>
       {NATION_CODE.split(';').map((nation:string,i:number)=> 
       <div key={i}  className={''}>
        <Image title={NATION_NAME?.split(';')[i]} className={'border'} quality={100}  src={`/images/flags/${nation.toLowerCase().trim()}.svg`} alt="" width={50} height={30} />
        </div>)}
        </div>
        <div className={'flex flex-row gap-3 mt-3'}>
        {/* {NATION_NAME && NATION_NAME.split(';').map((nation:string, i:number)=>
        <div key={i} className={'flex'}>
            <p>{nation}</p>
        </div>)} */}
        </div>
        {/* <p>{Nation}</p> */}
      </section>}

    {ADDRESS&&address &&  <section className="mb-10">
        <h1 className="text-xl mb-[14px]">Addresses</h1>
        <ul className="mb-10">
          {address.map((location:string, i:number) => (
            <li
              key={i}
              className={`py-[14px] 
            ${i !== address.length  && "border-b border-gray-100"}`}
            >
              <p>{location}</p>
              {/* <p>{subContent}</p> */}
            </li>
          ))}
        </ul>
      </section>}

      {(identiKey.length > 0 && identiValue.length > 0) && (
    <section className="mb-10">
        <h1 className="text-xl mb-7">Identifiers</h1>
        {identiKey.map((method:string, i:number) => (
            <div key={i} className="flex gap-20 mb-4">
                <p className="w-[400px] mr-5 text-gray-400 mb-5">{method}</p>
                <h6 className={"w-[600px]"}>{identiValue[i]}</h6>
            </div>
        ))}
    </section>
)}
      {(OFAC_SDN==1) && (VES_CALL || VES_GROSS || VES_TONNAGE || VES_FLAG || VES_OWNER || VES_TYPE) && (
    <section className="mb-10">
        <h1 className="text-xl mb-7">Vessel Details</h1>
           {VES_CALL && <div  className="flex gap-20 mb-4">
                <p className="w-[400px] mr-5 text-gray-400 mb-5">{'Callsign'}</p>
                <h6 className={"w-[600px]"}>{VES_CALL}</h6>
            </div> }
           {VES_GROSS && <div  className="flex gap-20 mb-4">
                <p className="w-[400px] mr-5 text-gray-400 mb-5">{'Gross Registered Tonnage'}</p>
                <h6 className={"w-[600px]"}>{VES_GROSS}</h6>
            </div> }
           {VES_TONNAGE && <div  className="flex gap-20 mb-4">
                <p className="w-[400px] mr-5 text-gray-400 mb-5">{'Tonnage'}</p>
                <h6 className={"w-[600px]"}>{VES_TONNAGE}</h6>
            </div> }
           {VES_FLAG && <div  className="flex gap-20 mb-4">
                <p className="w-[400px] mr-5 text-gray-400 mb-5">{'Vessel Flag'}</p>
                <h6 className={"w-[600px]"}>{VES_FLAG}</h6>
            </div> }
           {VES_OWNER && <div  className="flex gap-20 mb-4">
                <p className="w-[400px] mr-5 text-gray-400 mb-5">{'Vessel Owner'}</p>
                <h6 className={"w-[600px]"}>{VES_OWNER}</h6>
            </div> }
           {VES_TYPE && <div  className="flex gap-20 mb-4">
                <p className="w-[400px] mr-5 text-gray-400 mb-5">{'Vessel Type'}</p>
                <h6 className={"w-[600px]"}>{VES_TYPE}</h6>
            </div> }
    
    </section>
)}
      {(contactKey.length > 0 && contactValue.length > 0) && (
    <section className="mb-10">
        <h1 className="text-xl mb-7">Contact Details</h1>
        {contactKey.map((method:string, i:number) => (
            <div key={i} className="flex gap-20 mb-4">
                <p className="w-[400px] mr-5 text-gray-400 mb-5">{method}</p>
                <h6 className={''}>{contactValue[i]}</h6>
            </div>
        ))}
    </section>
)}
    {(NOTES&&notes) &&  <section>
        <h1 className="text-xl mb-7">Notes</h1>
       {notes.map((note:string,i:number) =>
       <p key={i}>
          {note}
        </p>)}
      </section>}
    {(EU===0&&OFAC_NON_SDN===0&&UN===0&&KOFIU===0&&OFAC_SDN===0) ? "" :  
    <section className={'mt-10'}>
        <h1 className="text-xl mb-7">Listed</h1>
      
      <div className={'flex flex-col gap-3'}> 
      {EU!==0 &&<p>
          {"Listed as sanctioned business by EU"}
        </p>}
       {OFAC_NON_SDN!==0 &&<p>
          {"Listed as sanctioned business by OFAC Non-SDN List"}
        </p>}
       {UN!==0 &&<p>
          {"Listed as sanctioned business by UN"}
        </p>}
       {KOFIU!==0 &&<p>
          {"Listed as sanctioned business by KOFIU"}
        </p>}
       {OFAC_SDN!==0 &&<p>
          {"Listed as sanctioned business by OFAC SDN List"}
        </p>}
        </div>
      </section>}
    </main>
  );
};

export default BusinessCore;
