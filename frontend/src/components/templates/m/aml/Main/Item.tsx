import Image from "next/image";
import router from "next/router";

import arrow from "assets/icons/aml/arrow.svg";
import { AML } from "types/aml";
import { useState } from "react";

const Item = ({ data }: { data: AML }) => {
  const { id, qr, image, name, birth, countries, match, dataSet } = data;
  const handleDetail = (id: number) => router.push(`/${id}`);
  const [isOpenMore, setIsOpenMore] = useState(-1);

  return (
    <div
      className={`cursor-pointer 
    ${isOpenMore === id ? "pt-4" : "border-b border-gray-100 py-4"}`}
    >
      <section
        className="flex gap-3 items-center"
        onClick={() => setIsOpenMore(isOpenMore === id ? -1 : id)}
      >
        <Image src={image || ""} alt="" />
        <div className="flex-1">
          <h6 className="mb-2">{name}</h6>
          <p>{qr}</p>
        </div>
        <Image
          src={arrow}
          alt=""
          className={`${isOpenMore === id && "rotate-180"}`}
        />
      </section>
      {isOpenMore === id && (
        <section
          onClick={() => handleDetail(id)}
          className="mt-4 bg-gray-50 p-4 rounded-[8px]"
        >
          <div className="flex justify-between font-medium text-gray-700 mb-2">
            <p className="text-gray-400 text-xs">Date of Birth</p>
            <p>{birth}</p>
          </div>
          <div className="flex justify-between font-medium text-gray-700 mb-2">
            <p className="text-gray-400 text-xs">Countries</p>
            <p>{countries}</p>
          </div>
          <div className="flex justify-between font-medium text-[#34bb7a] mb-2">
            <p className="text-gray-400 text-xs">Match</p>
            <p>{match}</p>
          </div>
          <div className="flex justify-between font-medium text-[#111111]">
            <p className="text-gray-400 text-xs">Datasets</p>
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[202px]">
              {dataSet.map((v, i) => (
                <div
                  key={i}
                  className="w-[45px] h-6 bg-gray-200 rounded-20 text-center py-1.5 text-xs"
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Item;
