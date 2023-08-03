import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";

import bell from "assets/icons/header/bell.png";
import { MOBILE_MENUS } from "datas/header";

interface Props {
  onClose: () => void;
  setIsOpenAlarmModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenContactModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({
  onClose,
  setIsOpenContactModal,
  setIsOpenAlarmModal,
}: Props) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <main className="fixed top-16 left-0 w-full h-full bg-white z-20 ">
      <div className="h-[85%] flex flex-col">
        <ul className="flex flex-col gap-10 text-[18px] h-full items-center justify-center flex-1">
          {MOBILE_MENUS.map(({ id, title, path }) => (
            <li key={id}>
              <Link
                href={path}
                className={`${
                  path === router.asPath && "text-[#0148FF]"
                } text-[#111111]`}
                onClick={onClose}
              >
                <h6>{title}</h6>
              </Link>
            </li>
          ))}
        </ul>
        <section className="flex px-5">
          <article className="flex-1 flex items-center">
            <p
              className="text-[#111111] cursor-pointer"
              onClick={() => setIsOpenContactModal(true)}
            >
              Contact
            </p>
            <div className="bg-gray-300 w-px mx-3 h-[14px] mb-1" />
            {isLogin ? (
              <p
                className="text-gray-400 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Logout
              </p>
            ) : (
              <Link href="/login" onClick={onClose}>
                <p className="text-gray-400 cursor-pointer">Login</p>
              </Link>
            )}
          </article>
          <Image
            src={bell}
            alt=""
            className="cursor-pointer"
            onClick={() => setIsOpenAlarmModal((prev) => !prev)}
          />
        </section>
      </div>
    </main>
  );
};

export default Modal;
