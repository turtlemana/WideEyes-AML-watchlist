import Image from "next/image";

import close from "assets/icons/header/close.svg";
import { ALERTS } from "datas/header";

const Modal = ({ onClose }: { onClose: () => void }) => {
  return (
    <main className="z-10 absolute right-0 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] bg-white min-w-[420px] rounded-20 overflow-hidden">
      <section className="flex items-center px-5 pb-5 pt-6">
        <h2 className="text-2xl h-7 flex-1">Alert</h2>
        <Image
          src={close}
          alt=""
          className="w-6 cursor-pointer"
          onClick={onClose}
        />
      </section>
      <ul className="overflow-scroll h-[384px] ">
        {ALERTS.length === 0 ? (
          <li className="px-6 py-6 border-y border-gray-200 text-center">
            no alert
          </li>
        ) : (
          ALERTS.map(({ id, title, content, date, isRead }) => (
            <li
              key={id}
              className={`px-6 py-4 border-t border-gray-200 ${
                !isRead && "bg-[#ECF2FF]"
              }`}
            >
              <h6>{title}</h6>
              <p className="my-1">{content}</p>
              <p className="text-xs text-[#93969B]">{date}</p>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default Modal;
