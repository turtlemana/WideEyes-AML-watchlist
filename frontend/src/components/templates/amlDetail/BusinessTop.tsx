import Image from "next/image";

import download from "assets/icons/aml/download.svg";
import arrow from "assets/icons/aml/arrow.svg";
import Link from "next/link";
import { BusinessProfile } from "interfaces/detail";
import {CSVLink} from 'react-csv';
import {useState, useEffect} from 'react';

interface Props {
  profileData:BusinessProfile;
}

const BusinessTop = ({ profileData }: Props) => {
  const {WE_CD,NAME } = profileData;
  const csvData = Object.entries(profileData)
  .filter(([field, value]) => field !== 'PROFIL_IMG')
  .map(([field, value]) => ({
    field,
    value: value || "", 
}));
const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="max-w-1320 mx-auto p-8 rounded-20 bg-white flex items-start">
      <article className="flex gap-3 items-center flex-1">
        <div className="mr-10">
          <h5 className="text-[28px] mb-1">{NAME}</h5>
          <p className="text-gray-500">{WE_CD}</p>
        </div>

      </article>
      <div>
        <Link
          href="/"
          className="flex items-center gap-[5px] px-2.5 py-1.5 min-w-fit mb-1"
        >
          <Image src={arrow} alt="" className="rotate-90 h-3 w-4" />
          <p className="text-xs  text-[#111111]">Search Page</p>
        </Link>
        {isClient && <CSVLink data={csvData} filename={`${WE_CD}.csv`} className="flex  gap-[5px] px-2.5 py-1.5 border border-solid border-[#0198ff] rounded-20 bg-blue-rgba hover:bg-[#CCEAFF] min-w-fit">
          <p className="text-[#0198FF] text-xs ">Download Profile</p>
          <Image src={download} alt="" />
        </CSVLink>}
      </div>
    </header>
  );
};

export default BusinessTop;
