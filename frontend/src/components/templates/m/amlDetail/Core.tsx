import { ADDRESS, ALIASES, CORE_DATA } from "datas/aml";

const Core = () => {
  return (
    <main className="py-7 bg-white text-[#111111]">
      <section className="pb-4 border-b-[6px] border-gray-50">
        <h6 className="mb-2 px-5 ">Core Details</h6>
        <ul>
          {CORE_DATA.map(({ id, title, content }, i) => (
            <li
              key={id}
              className={`flex justify-between py-3 px-5 text-sm ${
                i !== CORE_DATA.length - 1 && "border-b border-gray-100"
              }`}
            >
              <p className="text-gray-400">{title}</p>
              <h6 className="text-black">{content}</h6>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-7 pb-4 border-b-[6px] border-gray-50">
        <h6 className="mb-2 px-5 ">Aliases</h6>
        <ul>
          {ALIASES.map(({ id, content }, i) => (
            <li
              key={id}
              className={`py-3 px-5 text-sm 
            ${i !== ALIASES.length - 1 && "border-b border-gray-100"}`}
            >
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-7 px-5 border-b-[6px] border-gray-50">
        <h6 className="mb-5">Nationalities</h6>
        <p className="text-sm">American</p>
      </section>

      <section className="py-7 px-5 border-b-[6px] border-gray-50">
        <h6 className="mb-5">Dates of Birth</h6>
        <p className="text-sm">14/06/1946</p>
      </section>

      <section className="pt-7 pb-4 border-b-[6px] border-gray-50">
        <h6 className="mb-2 px-5">Addresses</h6>
        <ul>
          {ADDRESS.map(({ id, content, subContent }, i) => (
            <li
              key={id}
              className={`py-3 px-5 text-sm 
            ${i !== ADDRESS.length - 1 && "border-b border-gray-100"}`}
            >
              <p className="mb-3">{content}</p>
              <p className="text-xs">{subContent}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-7 px-5 border-b-[6px] border-gray-50">
        <h1 className="mb-5 text-sm">Contact Details</h1>
        <div className="flex justify-between">
          <p className="text-gray-400">Telephone</p>
          <h6 className="text-black">+1-202-456-1111</h6>
        </div>
      </section>

      <section className="pt-7 pb-[40px] px-5">
        <h6 className="mb-5">Notes</h6>
        <p className="text-sm">
          Designated as a sanctioned person involved in terrorist and human
          rights activities against Iran and Iranian citizens by the Ministry of
          Foreign Affaris of Iran. The sanction designation was issued in
          compliance with the Law on Combating Human Rights Violations and US
          Adventurous and Terrorist Actions in the Region, ratified by the
          Iranian Parliamnet.
        </p>
      </section>
    </main>
  );
};

export default Core;
