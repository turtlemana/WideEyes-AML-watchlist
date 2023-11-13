import { ProfileDetail } from "interfaces/detail";
import Image from "next/image";

interface Props {
  profileData:ProfileDetail;
}

const Core = ({profileData}:Props) => {
  
 const {ADRESS,BIRTHDATE,CONTACT_KEY,CONTACT_VALUE,FIRSTNAME,FIRSTNAME_ALIAS,DEATHDATE,WHOLE_NAME_ALIAS
,GENDER,MIDDLENAME,MIDDLENAME_ALIAS,NOTES,Nation,SURNAME,SURNAME_ALIAS,IDENTI_KEY,IDENTI_VALUE,WE_CD,WHOLE_NAME,NATION_NAME,EU,OFAC_NON_SDN,UN,KOFIU,OFAC_SDN} =profileData
// let processAlias = (alias: string) => {
//   if (alias === null || alias === "NULL" || alias === "") {
//       return [];
//   }
//   let arrayAlias = alias.slice(1, -1).split(",");
//   return arrayAlias.map((item: string) => item === 'NULL' ? '' : item);
// }

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

// let firstAlias = processAlias(FIRSTNAME_ALIAS as string);
// let middleAlias = processAlias(MIDDLENAME_ALIAS as string);
// let surAlias = processAlias(SURNAME_ALIAS as string);


// let maxAliasLength = Math.max(firstAlias.length, middleAlias.length, surAlias.length);


  let address:string[];
  if (ADRESS === "NULL" || ADRESS === "") {
      address = [];
  } else {
      let cleanedString = ADRESS?.replace(/[\[\]"']/g, '');
      cleanedString = cleanedString?.replace(/^,+/, '');
      let parts = cleanedString?.split('/') ?? [];
      address=parts; 
      // address = [];
      // let addressPart = parts.slice(0, -1).filter((part:string) => part !== '').join(' ');
      // let businessPart = parts[parts.length - 1];
      // if (addressPart !== '') {
      //     address.push(addressPart);
      // }
      // if (businessPart !== '') {
      //     address.push(businessPart);
      // }
      // address = address.map((item: string) => item === 'NULL' ? '' : item);
  }
  let contactKey = processField(CONTACT_KEY as string);
  let contactValue = processField(CONTACT_VALUE as string);
  let identiKey=processField(IDENTI_KEY as string);
  let identiValue=processField(IDENTI_VALUE as string);
  let notes = processNote(NOTES as string);

  
  // while (firstAlias.length < maxAliasLength) firstAlias.push('');
  // while (middleAlias.length < maxAliasLength) middleAlias.push('');
  // while (surAlias.length < maxAliasLength) surAlias.push('');

  // const alias = firstAlias.map((item: string, index: number) => `${item} ${middleAlias[index]} ${surAlias[index]}`);

const alias=WHOLE_NAME_ALIAS ? WHOLE_NAME_ALIAS.slice(1,-1).split(',') :[]
  return (
    <main className="max-w-1320 mx-auto p-8 rounded-20 bg-white my-7 text-[#111111]">
      <section className="mb-10">
        <h1 className="text-xl mb-[14px]">Core Details</h1>
        <ul>
        {FIRSTNAME &&    <li
              className={`flex gap-5 py-[14px] 
                 "border-b border-gray-100"
              `}
            >
              <p className="w-[160px] text-gray-400">Forename</p>
              <h6>{FIRSTNAME}</h6>
            </li> }
           {MIDDLENAME && <li
              className={`flex gap-5 py-[14px] 
                 "border-b border-gray-100"
              `}
            >
              <p className="w-[160px] text-gray-400">Middle name</p>
              <h6>{MIDDLENAME}</h6>
            </li> }
          {SURNAME &&  <li
              className={`flex gap-5 py-[14px] 
                 "border-b border-gray-100"
              `}
            >
              <p className="w-[160px] text-gray-400">Surname</p>
              <h6>{SURNAME}</h6>
            </li>}
       {GENDER &&     <li
              className={`flex gap-5 py-[14px] 
                 "border-b border-gray-100"
              `}
            >
              <p className="w-[160px] text-gray-400">Gender</p>
              <h6>{GENDER}</h6>
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
            ${i !== alias.length && "border-b border-gray-100"}`}
            >
              <p>{name}</p>
            </li>
          )) }
        </ul>
      </section>}
     {Nation && <section className="mb-10">
        <h1 className="text-xl mb-7">Nationalities</h1>
            <div className={'flex flex-row gap-3'}>
       {Nation.split(';').map((nation:string, i:number)=> <div key={i}>
       <Image  title={NATION_NAME?.split(';')[i]} className={'border'} quality={100}  src={`/images/flags/${nation?.toLowerCase().trim()}.svg`} alt="" width={50} height={30} />
       </div>)} 
       </div>
            {/* {NATION_NAME && <p className={'mt-3'}>{NATION_NAME}</p>} */}
        {/* <p>{Nation}</p> */}
      </section>}
     {BIRTHDATE &&  <section className="mt-16 mb-10 space-y-3 ">
        <h1 className="text-xl mb-7">Dates of Birth</h1>
       {BIRTHDATE.split(';').map((date:string,i:number)=> <p className={'border-b py-3'}  key={i}>{date}</p>)} 
      </section>}
     {DEATHDATE &&  <section className="mt-16 mb-10">
     <h1 className="text-xl mb-7">Dates of Birth</h1>
       {DEATHDATE.split(';').map((date:string,i:number)=> <p className={'border-b py-3'}  key={i}>{date}</p>)} 
      </section>}
    {ADRESS&&address &&  <section className="mb-10">
        <h1 className="text-xl mb-[14px]">Addresses</h1>
        <ul className="mb-10">
          {address.map((location:string, i:number) => (
            <li
              key={i}
              className={`py-[14px] 
            ${i !== address.length  && "border-b border-gray-100"}`}
            >
              <p>{location}</p>
            </li>
          ))}
        </ul>
      </section>}

      {(identiKey.length > 0 && identiValue.length > 0) && (
    <section className="mb-10">
        <h1 className="text-xl mb-7">Identifiers</h1>
        {identiKey.map((method:string, i:number) => (
            <div key={i} className="flex gap-20">
                <p className="w-[260px] mr-5 text-gray-400 mb-5">{method}</p>
                <h6>{identiValue[i]}</h6>
            </div>
        ))}
    </section>
)}
      {(contactKey.length > 0 && contactValue.length > 0) && (
    <section className="mb-10">
        <h1 className="text-xl mb-7">Contact Details</h1>
        {contactKey.map((method:string, i:number) => (
            <div key={i} className="flex gap-5">
                <p className="w-[160px] text-gray-400 mb-5">{method}</p>
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
          {"Listed as sanctioned person by EU"}
        </p>}
       {OFAC_NON_SDN!==0 &&<p>
          {"Listed as sanctioned person by OFAC Non-SDN List"}
        </p>}
       {UN!==0 &&<p>
          {"Listed as sanctioned person by UN"}
        </p>}
       {KOFIU!==0 &&<p>
          {"Listed as sanctioned person by KOFIU"}
        </p>}
       {OFAC_SDN!==0 &&<p>
          {"Listed as sanctioned person by OFAC SDN List"}
        </p>}
        </div>
      </section>}
    </main>
  );
};

export default Core;
