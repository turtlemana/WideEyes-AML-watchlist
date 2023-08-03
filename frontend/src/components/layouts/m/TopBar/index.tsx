import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import my from "assets/icons/header/my.svg";
import logo from "assets/icons/header/amlLogo.png";
import option from "assets/icons/header/option.svg";
import close from "assets/icons/header/mobileClose.svg";
import search from "assets/icons/header/mobileSearch.svg";

import Modal from "components/layouts/m/TopBar/Modal";
import AlarmModal from "components/layouts/m/TopBar/AlarmModal";
import SearchModal from "components/layouts/m/TopBar/SearchModal";
import Contact from "components/templates/m/Contact";

const TopBarAML = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAlarmModal, setIsOpenAlarmModal] = useState(false);
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);

  return (
    <header className="fixed top-0 w-full z-30 bg-white h-16 border-b border-gray-100 py-[14px] px-5 ">
      <div className="h-full mx-auto flex items-center justify-between w-full">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            className="cursor-pointer max-w-[62px]"
          />
        </Link>
        {isOpenModal ? (
          <Image
            src={close}
            alt=""
            className="w-6 h-6 cursor-pointer"
            onClick={() => setIsOpenModal(false)}
          />
        ) : (
          <section className="flex items-center gap-4">
            <Image
              src={search}
              alt=""
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsOpenSearchModal((prev) => !prev)}
            />
            <Image
              src={option}
              alt=""
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsOpenModal((prev) => !prev)}
            />
            <Link href="/portfolio">
              <Image src={my} alt="" className="w-6 h-6" />
            </Link>
          </section>
        )}
      </div>
      {isOpenModal && (
        <Modal
          onClose={() => setIsOpenModal(false)}
          setIsOpenContactModal={setIsOpenContactModal}
          setIsOpenAlarmModal={setIsOpenAlarmModal}
        />
      )}
      {isOpenContactModal && (
        <Contact onClose={() => setIsOpenContactModal(false)} />
      )}
      {isOpenAlarmModal && (
        <AlarmModal onClose={() => setIsOpenAlarmModal(false)} />
      )}
      {isOpenSearchModal && <SearchModal />}
    </header>
  );
};

export default TopBarAML;
