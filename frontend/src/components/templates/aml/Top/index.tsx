import {useState,useRef,useMemo } from "react";
import Image from "next/image";
import { useSearch } from "contexts/SearchStateContext";
import {State,Action} from "contexts/SearchStateContext";
import info from "assets/icons/aml/info.svg";
import arrow from "assets/icons/aml/arrow.svg";
import close from "assets/icons/aml/close.png";
import search from "assets/icons/header/search.png";
import blueArrow from "assets/icons/aml/blueArrow.svg";
import {
  LOCATIONS,
  DATASETS,
  VIEWS,
  SEARCH_TYPE,
  SEARCH_OPTION,
  BIRTH,
} from "datas/aml";
import useModalCloseDiv from "utils/useModalCloseDiv";
import useTitleFromDataset from "utils/useTitleFromDataSet";



const Top = () => {
  const {state,dispatch} :{state:State,dispatch:React.Dispatch<Action>}=useSearch();
  
  const [birth, setBirths] = useState(0);
  const [birthRange, setBirthRange] = useState("Same Year")
  const [searchType, setSearchType] = useState(0);
  const [businessSearchType, setBusinessSearchType]= useState(0);
  const [isBirthActive, setIsBirthActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDataSetOpen, setIsDataSetOpen] = useState(false);


  const [checkedItems, setCheckedItems] = useState(() => {
    const initialCheckedItems: Record<string, boolean> = {};
    DATASETS.forEach(({ title }) => {
      initialCheckedItems[title] = true;
    });
    return initialCheckedItems;
  });


  const checkedDataSet = useMemo(()=>{
    
    const trueItems = Object.keys(checkedItems).filter(key => checkedItems[key] === true);
    return trueItems
  },[checkedItems])



  const [tmpDay, setTmpDay] = useState<number | string | ''>("")
  const [tmpMonth, setTmpMonth] = useState<number | string | ''>("")
  const [tmpYear, setTmpYear] = useState<number | ''>("")
 
  const searchOptionRef = useModalCloseDiv(isSearchActive, setIsSearchActive)
  const birthdayOptionRef = useModalCloseDiv(isBirthActive, setIsBirthActive)
  const qrCodeRef = useRef<HTMLInputElement>(null);
  const nameRef= useRef<HTMLInputElement>(null);

  const dayRef= useRef<HTMLInputElement>(null);
  const monthRef= useRef<HTMLInputElement>(null);
  const yearRef= useRef<HTMLInputElement>(null);

  const viewRef=useRef<HTMLSelectElement>(null);
  const nationRef=useRef<HTMLSelectElement>(null);
 
  const businessQrCodeRef = useRef<HTMLInputElement>(null);
  const businessNameRef= useRef<HTMLInputElement>(null);
  const businessViewRef=useRef<HTMLSelectElement>(null);
  const businessNationRef=useRef<HTMLSelectElement>(null);

  const getTitleFromDataset = useTitleFromDataset();


const selectAll = () => {
  const newCheckedItems: Record<string, boolean> = {};
  DATASETS.forEach(({ title }) => {
    newCheckedItems[title] = true;
  });
  setCheckedItems(newCheckedItems);
};


const clearAll = () => {
  setCheckedItems({});
};

  const qrSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (state.searchOption === "individual") {
      dispatch({type:"SET_PAGE",payload :1})
      dispatch({type:"SET_QR_CODE",payload :qrCodeRef.current?.value || ''})
      dispatch({type:"SET_QR_SEARCH_CLICKED",payload :true})
      dispatch({type:"SET_NAME_SEARCH_CLICKED",payload :false})
      dispatch({type:"SET_BUSINESS_QR_SEARCH_CLICKED",payload :false})
      dispatch({type:"SET_BUSINESS_NAME_SEARCH_CLICKED",payload :false})
    }
    
      
      else if (state.searchOption === "business") {
        dispatch({type:"SET_BUSINESS_PAGE",payload :1})
        dispatch({type:"SET_BUSINESS_QR_CODE",payload :businessQrCodeRef.current?.value || ''})
        dispatch({type:"SET_BUSINESS_QR_SEARCH_CLICKED",payload :true})
        dispatch({type:"SET_BUSINESS_NAME_SEARCH_CLICKED",payload :false})
        dispatch({type:"SET_QR_SEARCH_CLICKED",payload :false})
        dispatch({type:"SET_NAME_SEARCH_CLICKED",payload :false})
      }

      else {
        return 
      }
    }


  const nameSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (state.searchOption ==="individual") {
    if (checkedDataSet.length === 0) {
      alert('Please select at least one dataset.');
      return;
    }
    dispatch({type:"SET_PAGE",payload :1})
    dispatch({type:"SET_VIEWS",payload :Number(viewRef.current?.value) ||20})
    dispatch({type:"SET_NAME",payload :nameRef.current?.value || ''})
    dispatch({type:"SET_QR_SEARCH_CLICKED",payload :false})
    dispatch({type:"SET_NAME_SEARCH_CLICKED",payload :true})
    dispatch({type:"SET_BUSINESS_QR_SEARCH_CLICKED",payload :false})
    dispatch({type:"SET_BUSINESS_NAME_SEARCH_CLICKED",payload :false})

    checkedDataSet.length < 8 ? dispatch({type:"SET_DATASET",payload :encodeURIComponent(checkedDataSet.join(','))})
    : dispatch({type:"SET_DATASET",payload : ""})


    if(nationRef.current?.value ==="All"){
      dispatch({type:"SET_NATION", payload:""})
    } else {
    dispatch({type:"SET_NATION", payload:nationRef.current?.value || ""})

  }
  const yearValue = yearRef.current?.value || '';
  const monthValue = monthRef.current?.value || '';
  const dayValue = dayRef.current?.value || '';

  if (!yearValue && (monthValue || dayValue)) {
    alert('Year must be filled to submit.');
    return;
  }

  if (yearValue && !monthValue && dayValue) {
    alert('Month must be filled to submit.');
    return;
  }
  let birthString = '';
  if (yearValue) {
    birthString += yearValue;
    if (monthValue) {
      birthString += '-' + monthValue;
      if (dayValue) {
        birthString += '-' + dayValue;
      }
    }
  }

  let startDate = '';
  let endDate = '';
  
  if(birthString){
      if(birthRange === "Exact Match" || birthRange === "Same Year") {
          startDate = birthString;
          endDate = birthString;
      } else if(birthRange === "1 year") {
          startDate = birthString;
          endDate = (parseInt(birthString.split('-')[0],10)+1).toString() + birthString.slice(4);
      } else if(birthRange === "3 years") {
          startDate = birthString;
          endDate = (parseInt(birthString.split('-')[0],10)+3).toString() + birthString.slice(4);
      } else if(birthRange === "5 years") {
          startDate = birthString;
          endDate = (parseInt(birthString.split('-')[0],10)+5).toString() + birthString.slice(4);
      }
  }

  
  dispatch({type:"SET_BIRTH_START", payload: startDate});
  dispatch({type:"SET_BIRTH_END", payload: endDate});
} 

else if (state.searchOption === "business") {
  dispatch({type:"SET_BUSINESS_PAGE",payload :1})
  dispatch({type:"SET_BUSINESS_VIEWS",payload :Number(businessViewRef.current?.value) ||20})
  dispatch({type:"SET_BUSINESS_NAME",payload :businessNameRef.current?.value || ''})
  dispatch({type:"SET_BUSINESS_QR_SEARCH_CLICKED",payload :false})
  dispatch({type:"SET_BUSINESS_NAME_SEARCH_CLICKED",payload :true})
  dispatch({type:"SET_QR_SEARCH_CLICKED",payload :false})
  dispatch({type:"SET_NAME_SEARCH_CLICKED",payload :false})

  if(businessNationRef.current?.value ==="All"){
    dispatch({type:"SET_BUSINESS_NATION", payload:"-mollynation"})
  } else {
  dispatch({type:"SET_BUSINESS_NATION", payload:businessNationRef.current?.value || ""})

}
}
  // dispatch({type:"SET_BIRTH", payload: birthString});
}



const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  const isValueValid = value === "" || (value.length === 2 && Number(value) >= 1 && Number(value) <= 31);
  const isSingleDigit = value.length === 1 && Number(value) >= 0 && Number(value) <= 9;
  if (isValueValid || isSingleDigit) {
    setTmpDay(value);
  }
};

const handleDayBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const numValue = Number(value);
  if (numValue < 10 && numValue > 0) {
    setTmpDay(`0${numValue}`);
  }
};

const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  const isValueValid = value === "" || (value.length === 2 && Number(value) >= 1 && Number(value) <= 12);
  const isSingleDigit = value.length === 1 && Number(value) >= 0 && Number(value) <= 9;
  if (isValueValid || isSingleDigit) {
    setTmpMonth(value);
  }
};

const handleMonthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const numValue = Number(value);
  if (numValue < 10 && numValue > 0) {
    setTmpMonth(`0${numValue}`);
  }
};

const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  if (value === "") {
      setTmpYear("");
  } else {
      const numValue = Number(value);
      if (value.length === 4 && numValue < 1900) {
          setTmpYear(1900);
      } else if (numValue > 9999) {
          setTmpYear(9999);
      } else {
          setTmpYear(numValue);
      }
  }
};
const handleReset = () => {
  if (qrCodeRef.current) qrCodeRef.current.value = '';
  if (nameRef.current) nameRef.current.value = '';
  if (viewRef.current) viewRef.current.value = '20';
  if (nationRef.current) nationRef.current.value = 'All';
  if (dayRef.current) dayRef.current.value = '';
  if (monthRef.current) monthRef.current.value = '';
  if (yearRef.current) yearRef.current.value = '';


  if (businessQrCodeRef.current) businessQrCodeRef.current.value = '';
  if (businessNameRef.current) businessNameRef.current.value = '';
  if (businessViewRef.current) businessViewRef.current.value = '20';
  if (businessNationRef.current) businessNationRef.current.value = 'All';

  setIsSearchActive(false);
  setSearchType(0);
  dispatch({type:'SET_VIEWS',payload:20});
  dispatch({type:'SET_BUSINESS_VIEWS',payload:20});
  setTmpDay('');
  setTmpMonth('');
  setTmpYear('');
  setBirths(0)

  
  const initialCheckedItems: Record<string, boolean> = {};
  DATASETS.forEach(({ title }) => {
    initialCheckedItems[title] = true;
  });
  setCheckedItems(initialCheckedItems);
};

  return (
    <main className="max-w-1320 w-full">
      <section className="ml-8 relative mb-7 text-sm">
        <div
          onClick={() => setIsSearchActive(!isSearchActive)}
          className={`items-center cursor-pointer border rounded-20 w-[169px] py-2.5 px-3 flex justify-between text-gray-600 ${
            isSearchActive ? "border-[#0198FF]" : "border-gray-200 "
          } `}
        >
          <p className={`${isSearchActive && "text-[#0198FF]"}`}>
            {state.searchOption[0].toUpperCase() +state.searchOption.substring(1) + " Search"}
          </p>
          <Image src={isSearchActive ? blueArrow : arrow} alt="" />
        </div>
        {isSearchActive && (
          <div ref={searchOptionRef} className="z-10 absolute top-11  left-0 bg-white py-3 px-2 border-gray-200 border rounded-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] w-[169px]">
            {SEARCH_OPTION.map(({ id, title,content }) => (
              <div
                key={id}
                className="gap-2 px-3 py-1.5 cursor-pointer "
                onClick={() => {
                  setIsSearchActive(false);
                  dispatch({type:"SET_SEARCH_OPTION",payload:content});
                  setSearchType(0);
                  setBusinessSearchType(0);
                }}
              >
                <h6
                  className={`mt-px ${
                    state.searchOption === content ? "text-[#0198FF]" : "text-gray-500"
                  }`}
                >
                  {title}
                </h6>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-8 mb-6 flex justify-between text-[#111111] text-2xl">
        <div className="flex-1 flex gap-8">
          {SEARCH_TYPE.map(({ id, title }) => (
            <h1
              className={`${
           (state.searchOption==="individual" ?   searchType !== id : businessSearchType!==id) && "text-gray-300"
              } cursor-pointer`}
              onClick={() => state.searchOption==="individual" ? setSearchType(id) : setBusinessSearchType(id)}
              key={id}
            >
              {title}
            </h1>
          ))}
        </div>
        {searchType === 0 && (
          <button onClick={handleReset}>
            <p className="text-[#0198ff] text-sm">All reset</p>
          </button>
        )}
      </section>

      {
      
      state.searchOption === "individual" ?
      searchType === 1 ? (
        <section className="mx-8 mb-12">
          <h6 className="mb-3">Quick Reference</h6>
          <form onSubmit={qrSubmit} className="flex w-full gap-3">
            <article className="max-w-[580px] w-full py-2.5 px-3 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
              <Image src={search} alt="search" className="mr-2 w-4 h-4 " />
              <input
                placeholder="Search QR Code"
                className="outline-none text-sm h-[18px] w-full"
                ref={qrCodeRef}
                required
              />
            </article>
            <button type="submit" className="max-h-10 py-2.5 px-5 bg-[#0198ff] rounded-20 mr-2 hover:bg-[#0085E6]">
              <h1 className="text-white text-sm">Search</h1>
            </button>
          </form>
        </section>
      ) : (
        <form onSubmit={nameSubmit}>
          <section className="mx-8 mb-5 pb-5 ">
            <ul className="flex gap-[10px] overflow-scroll w-full scrollbar-hide items-center">
            {DATASETS.filter(({ title }) => checkedItems[title]).map(({ id, title, color, text }) => (
  <li
  title={getTitleFromDataset(title)}
    key={id}
    className={`flex justify-center items-center min-w-fit rounded-20 px-3.5 py-1.5 text-center  max-h-[28px] ${color}`}
  >
    <h6 className={`text-sm ${text}`}>{title}</h6>
  </li>
))}
              <li
                className={`text-sm ml-5 h-[18px] cursor-pointer ${
                  !isDataSetOpen ? "text-[#0085e6]" : "text-gray-300"
                }`}
                onClick={() => setIsDataSetOpen((prev) => !prev)}
              >
                Choose Dataset
              </li>
            </ul>
          </section>
          {isDataSetOpen && (
        <section className="mx-8 mb-5 pb-5 ">
            <ul className="flex gap-x-[10px] items-center flex-wrap relative">
                <li className="w-full flex mt-[-10px] mb-3 text-sm pl-10 gap-10">
                    <p className="cursor-pointer text-black font-bold  p-1" onClick={selectAll}>Select all</p>
                    <p className="cursor-pointer text-[#0085e6] font-bold  p-1" onClick={clearAll}>Clear all</p>
                </li>
                <Image
                    src={close}
                    alt="close"
                    className="w-4 h-4 absolute right-0 top-7 cursor-pointer"
                    onClick={() => setIsDataSetOpen(false)}
                />
              {DATASETS.map(({ id, title,content }) => (
  <li
  title={getTitleFromDataset(title)}
    key={id}
    className={
      "min-w-fit px-3.5 py-1.5 text-center cursor-pointer max-h-[30px] w-[230px] "
    }
  >
    <div className="flex gap-1 items-center">
      <input
        type="checkbox"
        className="h-4 w-4 cursor-pointer"
        id={`checkbox${title}`}
        checked={!!checkedItems[title]}
        onChange={() => {
          setCheckedItems({ ...checkedItems, [title]: !checkedItems[title] });
        }}
      />
      <label
        className="customCheckbox"
        htmlFor={`checkbox${title}`}
      >
        <h6 className="text-sm text-gray-500 h-4 font-medium cursor-pointer">
          {content}
        </h6>
      </label>
    </div>
  </li>
))}
                {/* <li className="w-full mt-5 pl-3.5 flex items-center gap-1.5 text-gray-500">
                  <Image src={info} alt="info" className="w-4 h-4 mb-px" />
                  Use <span className="text-[#0085e6]">Legacy Search</span> for
                  Corporate Registry, Charities Commission, Watchlist and
                  Cannabis Related Business.
                </li> */}
              </ul>
            </section>
          )}
          <div  className="px-8 pb-5 flex mb-5 w-full gap-8 laptop:gap-5">
            <div className="max-w-[440px] w-full">
              <h6 className="mb-3">Fullname</h6>
              <div  className="py-2.5 px-3 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
                <Image src={search} alt="search" className="mr-2 w-4 h-4 " />
                <input
                  placeholder="Search Name"
                  className="outline-none text-sm h-[18px] w-full"
                    required
                  ref={nameRef}
                />
              </div>
            </div>
            <div className="max-w-[170px] w-full">
              <h6 className="mb-3">Date of Birth</h6>
              <div className="flex items-center gap-1 text-sm">
              <input
                type="number"
                  placeholder="yyyy"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  outline-none border-b border-solid border-gray-500 w-[55px] p-2 bg-white"
                  maxLength={4}
                  ref={yearRef}
                  value={tmpYear}
                  onChange={handleYearChange}
                 
                />
                <input
                type="number"
                  placeholder="mm"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none border-b border-solid border-gray-500 w-[40px] p-2 bg-white"
                  maxLength={2}
                  min={1}
                  max={12}
                  ref={monthRef}
                  value={tmpMonth}
                  onChange={handleMonthChange}
                  onBlur={handleMonthBlur}
                />
              <input
                type="number"
                  placeholder="dd"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  outline-none border-b border-solid border-gray-500 w-[40px] p-2 bg-white"
                  maxLength={2}
                  min="1"
                  max="31"
                  ref={dayRef}
                  value={tmpDay}
                  onChange={handleDayChange}
                  onBlur={handleDayBlur}

                />
 
              </div>
            </div>

            <div className="w-full max-w-[200px]">
              <h6 className="mb-3 text-base text-[#111111] mobile:text-sm ">
                Birth Year Range
              </h6>
              <div className="flex gap-4 items-center relative justify-between min-w-80">
                <div
                  onClick={() =>
                    Number(tmpYear) > 1000 && setIsBirthActive(!isBirthActive)
                  }
                  className={`cursor-pointer border rounded-20 w-full max-h-10 py-2 px-3.5 flex justify-between 
                  ${Number(tmpYear) >1000 ? " bg-white " : "border-gray-200 "} 
                 ${isBirthActive && "border-[#0198FF] "}
                  ${ "bg-gray-200 cursor-default "} 
                  `}
                >
                  <p
                    className={`text-sm ${
                      isBirthActive ? "text-[#0198FF]" : "text-gray-600"
                    }`}
                  >
                    {BIRTH[birth].title}
                  </p>
                  {isBirthActive ? (
                    <Image src={blueArrow} alt="" />
                  ) : (
                    <Image src={arrow} alt="" />
                  )}
                </div>
                {isBirthActive && (
                  <div
                  ref={birthdayOptionRef}
                    className={`z-10 absolute top-11 right-0 bg-white py-3 px-2 border-gray-200 border rounded-20 shadow-[0_0_12px_0_rgba(121,120,132,0.15)] w-full`}
                  >
                    {BIRTH.map(({ id, title }) => (
                      <div
                        key={id}
                        className={`flex gap-2 px-3 py-1.5 cursor-pointer`}
                        onClick={() => {
                          setBirths(id);
                          setBirthRange(title);
                          setIsBirthActive(false);
                        }}
                      >
                        <h6
                          className={`text-sm mt-px ${
                            birth === id ? "text-[#0198FF]" : "text-gray-500"
                          }`}
                        >
                          {title}
                        </h6>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="mx-8 mb-12">
  <h6 className="mb-3 text-base text-[#111111] mobile:text-sm">
    Country or Nationality
  </h6>
  <div className="flex items-end gap-10 ">
    <div className="flex flex-col">
      <select
      ref={nationRef}
        className="w-[300px] cursor-pointer border rounded-20  max-h-10 py-2 px-3.5 text-sm text-gray-600 border-gray-200"
      >
        {LOCATIONS.map(({ id, title }) => (
          <option key={id} value={title}>
            {title}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col">
      <select
      ref={viewRef}
        className="w-[300px] cursor-pointer border rounded-20  max-h-10 py-2 px-3.5 text-sm text-gray-600 border-gray-200"
      >
        {VIEWS.map(({ id, title,content }) => (
          <option key={id} value={content}>
            {title}
          </option>
        ))}
      </select>
    </div>
    <button disabled={checkedDataSet.length === 0}  type="submit" className="disabled:bg-gray-300 w-[150px] max-h-10 py-2.5 px-5 bg-[#0198ff] rounded-20 hover:bg-[#0085E6]">
      <h1 className="text-white text-sm">Search</h1>
    </button>
  </div>
</section>
        </form>
      ) : 
      
      businessSearchType === 1 ? (
        <section className="mx-8 mb-12">
          <h6 className="mb-3">Quick Reference</h6>
          <form onSubmit={qrSubmit} className="flex w-full gap-3">
            <article className="max-w-[580px] w-full py-2.5 px-3 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
              <Image src={search} alt="search" className="mr-2 w-4 h-4 " />
              <input
                placeholder="Search QR Code"
                className="outline-none text-sm h-[18px] w-full"
                ref={businessQrCodeRef}
                required
              />
            </article>
            <button type="submit" className="max-h-10 py-2.5 px-5 bg-[#0198ff] rounded-20 mr-2 hover:bg-[#0085E6]">
              <h1 className="text-white text-sm">Search</h1>
            </button>
          </form>
        </section>
      ) : (
        <form onSubmit={nameSubmit}>
        
          <div  className="px-8 pb-5 flex mb-2 w-full gap-8 laptop:gap-5">
            <div className="max-w-[440px] w-full">
              <h6 className="mb-3">Fullname</h6>
              <div  className="py-2.5 px-3 flex items-center border border-solid border-gray-200 rounded-20 hover:border-[#4B5563]">
                <Image src={search} alt="search" className="mr-2 w-4 h-4 " />
                <input
                  placeholder="Search Name"
                  className="outline-none text-sm h-[18px] w-full"
                    required
                  ref={businessNameRef}
                />
              </div>
            </div>
            <section className="mx-8 ">
  <h6 className="mb-3 text-base text-[#111111] mobile:text-sm">
    Country or Nationality
  </h6>
  <div className="flex items-end gap-10 ">
    <div className="flex flex-col">
      <select
      ref={businessNationRef}
        className="w-[300px] cursor-pointer border rounded-20  max-h-10 py-2 px-3.5 text-sm text-gray-600 border-gray-200"
      >
        {LOCATIONS.map(({ id, title }) => (
          <option key={id} value={title}>
            {title}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col">
      <select
      ref={businessViewRef}
        className="w-[300px] cursor-pointer border rounded-20  max-h-10 py-2 px-3.5 text-sm text-gray-600 border-gray-200"
      >
        {VIEWS.map(({ id, title,content }) => (
          <option key={id} value={content}>
            {title}
          </option>
        ))}
      </select>
    </div>

  </div>
</section>
  
          </div>
          <section className="mx-8 mb-10">

          <button disabled={checkedDataSet.length === 0}  type="submit" className="disabled:bg-gray-300 w-[150px] max-h-10 py-2.5 px-5 bg-[#0198ff] rounded-20 hover:bg-[#0085E6]">
      <h1 className="text-white text-sm">Search</h1>
    </button>
    </section>
         
        </form>
      )}
    </main>
  );
};

export default Top;
