import Link from "next/link";
import Image from "next/image";

import download from "assets/icons/aml/download.svg";
import arrow from "assets/icons/aml/arrow.svg";
import { AML } from "types/aml";

const Top = ({ data }: { data: AML }) => {
  const { qr, image, dataSet, name } = data;

  return (
    <header className="py-4 bg-white text-[#111111]">
      <section className="flex gap-3 items-center mb-4 px-5 ">
        <Image src={image || ""} alt="" className="w-12" />
        <div>
          <h6 className="mb-1">{name}</h6>
          <p className="text-sm">{qr}</p>
        </div>
      </section>

      <section className="flex flex-wrap gap-2 h-full w-full border-b border-gray-100 pb-4 mb-4 px-5">
        {dataSet.map((v, i) => (
          <div
            key={i}
            className="w-[45px] h-6 bg-gray-200 rounded-20 text-center py-1.5 text-xs"
          >
            {v}
          </div>
        ))}
      </section>

      <div className="flex justify-between pr-5">
        <Link
          href="/"
          className="flex items-center gap-[5px] px-2.5 py-1.5 min-w-fit mb-1"
        >
          <Image src={arrow} alt="" className="rotate-90 h-3 w-4" />
          <p className="text-xs h-3 text-[#111111]">Search Page</p>
        </Link>
        <button className="ml-5 flex gap-[5px] px-2.5 py-1.5 border border-solid border-[#0198ff] rounded-20 bg-blue-rgba hover:bg-[#CCEAFF]">
          <p className="text-[#0198FF] text-xs h-3">Download Profile</p>
          <Image src={download} alt="" />
        </button>
      </div>
    </header>
  );
};

export default Top;
