import Link from "next/link";
import Image from "next/image";

import { CONTACTS, INFO, MENUS } from "datas/footer";
import logo from "assets/icons/footer/logo.png";

const Footer = () => {
  return (
    <footer className="pt-10 pb-[60px] border-t">
      <div className="max-w-1320 gap-[86px] mx-auto flex items-start desktop:max-w-5xl desktop:px-3 laptop:max-w-3xl laptop:px-3 laptop:flex-col laptop:gap-10">
        <Image src={logo} alt="logo" />
        <section className="flex-1">
          <h4 className="text-gray-600 mb-7 laptop:mb-5">Customer Service</h4>
          <ul className="flex items-center gap-5 mb-2">
            {CONTACTS.map(({ id, title, content, border }) => (
              <li key={id} className="flex items-center gap-3">

                <p className="text-sm text-gray-400 w-[42px]">{title}</p>
                {title==="Web" ? 
              <Link href={content} className="text-sm text-gray-800" target="_blank">{content}</Link>
              : 
                <p className="text-sm text-gray-800">{content}</p>}
                {border && (
                  <div className="h-3 w-px border border-solid border-gray-200 ml-2" />
                )}
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-7 mb-12 laptop:mb-10">
            {INFO.map(({ id, title, content }) => (
              <li key={id} className="flex items-center gap-3">
                <p className="text-sm text-gray-400">{title}</p>
             
              <p className="text-sm text-gray-800">{content}</p>
               
              </li>
            ))}
          </ul>
          <ul className="flex gap-5 text-gray-600 font-medium text-sm ">
            {MENUS.map(({ id, title, path }) => (
              <li key={id} className="w-[98px]">
                <Link href={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
