import Image from "next/image";
import router from "next/router";
import noProfile from 'assets/icons/main/noProfile.svg'
import useTitleFromDataset from "utils/useTitleFromDataSet";


const Item = ({ data }:{data:{ WE_CD:number;
  PROFILE_IMAGE:string | null;
  WHOLE_NAME:string |null; 
  TRUE_NAME:string | null;
  BIRTHDATE:string | null;
  DATA_SET:string | null;
  NATION_CODE:string | null;
  NATION_NAME:string | null;}}) => {
  const { WE_CD, BIRTHDATE, DATA_SET, NATION_NAME, PROFILE_IMAGE, WHOLE_NAME,TRUE_NAME } = data;
  const handleDetail = (id: number) => router.push(`/individual/${id}`);
  const DATA_ARR = DATA_SET ? DATA_SET.split(',').map((item:string) => item.trim()) : "";
 
  const getTitleFromDataset = useTitleFromDataset();

  return (
    <tr
      className="border-b border-gray-100 cursor-pointer"
      onClick={() => handleDetail(WE_CD)}
    >
      <td className="pl-8">{WE_CD}</td>
      <td className="flex justify-center items-center h-full">
        {PROFILE_IMAGE ?
        <Image  width={50} height={50} className={'w-[80px] h-[80px]'} src={PROFILE_IMAGE.split(',')[0] || ""} alt="" />
     :        <Image width={50} height={50} className={'w-[80px] h-[80px]'} src={noProfile || ""} alt="" />}

        </td>
      <td>{TRUE_NAME}</td>
      <td className="text-center">  
      {BIRTHDATE && BIRTHDATE.split(',').map((date:string, index:number) => (
    <div key={index}>{date}</div>
  ))}</td>
      <td className="pl-3">{NATION_NAME}</td>
      <td className="h-full w-[208px] py-[15px]">
        <div className="flex flex-wrap gap-2 h-full">
          {DATA_ARR && DATA_ARR.map((v:string, i:number) => (
            <div
            title={getTitleFromDataset(v)}
              key={i}
              className="flex items-center justify-center max-w-[110px] px-2 h-6 bg-gray-200 rounded-20 text-center py-1.5 text-xs"
            >
              {v}
            </div>
          ))}
        </div>
      </td>
      {/* <td className="text-[#34bb7a] text-center">{match}</td> */}
    </tr>
  );
};

export default Item;
