import Link from "next/link";
import Image from "next/image";

import { CONTACTS, MENUS } from "datas/footer";
import logo from "assets/icons/footer/logo.png";

const Footer = () => {
  return (
    <footer className="pt-7 pb-10 border-t px-5 bg-gray-50">
      <div>
        <Image src={logo} alt="logo" className="h-7 w-[54px] mb-7" />
        <h1 className="text-gray-600 mb-4 text-sm">Customer Service</h1>
        <ul className="mb-[30px]">
          {CONTACTS.map(({ id, title, content }) => (
            <li key={id} className="flex items-center gap-2 mb-2.5 text-xs">
              <p className="text-gray-400 w-[46px]">{title}</p>
              <p className="text-gray-800">{content}</p>
            </li>
          ))}
        </ul>
        <ul className="flex gap-6 text-gray-600 font-medium text-sm ">
          {MENUS.map(({ id, title, path }) => (
            <li key={id}>
              <Link href={path}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
