import Image from "next/image";

import close from "assets/icons/header/close.svg";
import { ALERTS } from "datas/header";

const AlarmModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <main className="z-30 absolute bg-white left-0 top-0 w-full h-screen overflow-scroll">
      <section className="flex justify-center px-5 relative">
        <h6 className="my-3.5">Alert</h6>
        <Image
          src={close}
          alt=""
          className="absolute w-6 cursor-pointer right-5 top-3"
          onClick={onClose}
        />
      </section>
      <ul className="">
        {ALERTS.length === 0 ? (
          <li className="px-5 py-4 border-y border-gray-200 text-center">
            no alert
          </li>
        ) : (
          ALERTS.map(({ id, title, content, date, isRead }) => (
            <li
              key={id}
              className={`px-6 py-4 border-b border-gray-200 ${
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

export default AlarmModal;
