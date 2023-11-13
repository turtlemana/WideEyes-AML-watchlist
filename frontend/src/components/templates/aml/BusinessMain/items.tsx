import Image from "next/image";
import router from "next/router";

const Item = ({ data }:{data:{ WE_CD:number;
  TRUE_NAME:string | null;
  NATION_CODE:string | null;
  NATION_NAME:string | null;}}) => {
  const { WE_CD,NATION_CODE,TRUE_NAME,NATION_NAME } = data;
  const handleDetail = (id: number) => router.push(`/business/${id}`);

  return (
    <tr
      className="border-b border-gray-100 cursor-pointer h-[80px]"
      onClick={() => handleDetail(WE_CD)}
    >
      <td className="pl-8">{WE_CD}</td>
      <td>{TRUE_NAME}</td>
      <td className="pl-8 flex flex-row gap-3 mt-5">  
      {NATION_CODE && NATION_CODE.split(';').slice(0,8).map((nation:string, index:number) => (
    // <div key={index}>{nation}</div>
    <Image  className={'border'} key={index} title={NATION_NAME?.split(';')[index]} quality={100}  src={`/images/flags/${nation.toLocaleLowerCase()}.svg`} alt="" width={50} height={30} />
  ))}</td>

    </tr>
  );
};

export default Item;
