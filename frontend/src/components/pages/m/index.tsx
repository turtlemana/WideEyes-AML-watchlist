import { useState } from "react";

import Top from "components/templates/m/aml/Top";
import Main from "components/templates/m/aml/Main";

const AML = () => {
  const [views, setViews] = useState(20);

  return (
    <main className="">
      <div className="py-8 bg-white">
        <h1 className="ml-5 text-2xl text-[#111111] mb-5">GNE Watchlist</h1>
        <Top setViews={setViews} />
        <Main views={views} />
      </div>
    </main>
  );
};

export default AML;
