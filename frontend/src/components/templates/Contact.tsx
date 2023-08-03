import { useState } from "react";
import Image from "next/image";

import close from "assets/icons/contact/close.svg";

const Contact = ({ onClose }: { onClose: () => void }) => {
  const [detail, setDetail] = useState("");

  return (
    <main className="z-20 border absolute bg-white p-8 rounded-20 top-1/2 left-1/2 translate-x-half translate-y-half">
      <header className="flex mb-5">
        <h1 className="text-2xl flex-1">Contact us</h1>
        <Image
          src={close}
          alt=""
          className="mb-1 cursor-pointer"
          onClick={onClose}
        />
      </header>
      <section>
        <p className="text-sm text-gray-600 mb-10">
          Complete the form and an Account <br />
          Manager Will be in touch soon.
        </p>
        <article className="mb-6">
          <p className="text-sm mb-2">Email</p>
          <input
            placeholder="Email"
            className="border border-gray-200 rounded-20 px-3 py-2.5 w-[326px] text-sm h-10 focus:border-[#4B5563] outline-none"
          />
        </article>
        <article className="mb-10">
          <p className="text-sm mb-2">Detail</p>
          <textarea
            placeholder="Text"
            className="border border-gray-200 rounded-20 mb-2 px-3 py-2.5 w-[326px] text-sm h-[220px] resize-none focus:border-[#4B5563] outline-none"
            onChange={(e) => setDetail(e.target.value)}
          />
          <p className="text-right text-gray-400 text-xs">
            {detail.length}/500
          </p>
        </article>
      </section>
      <button
        className="bg-[#0198FF] w-full p-3 rounded-[60px] text-white font-bold hover:bg-[#0085E6] disabled:bg-[#D1D5DB]"
        onClick={onClose}
      >
        Send
      </button>
    </main>
  );
};

export default Contact;
